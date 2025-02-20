import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { init, use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TransactionDate } from '../../types/models/response/transaction-date/transaction-date.type';
import { LITERALS } from '../../constants/literals';

use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

type CategoryType = { value: number; name: string };

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnChanges {
  @Input() transactionDates: TransactionDate[] = [];
  @Input() type: string = 'EXPENSE';
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  literals = LITERALS;
  private categories: CategoryType[] = [];
  private chart: any | null = null;

  private collectCategoriesByTransactionType(type: string): CategoryType[] {
    return this.transactionDates
      .flatMap((date) => (type === 'EXPENSE' ? date.expenses : date.revenues))
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc: CategoryType[], transaction) => {
        const existingCategory = acc.find(
          (cat) => cat.name === transaction.category
        );
        if (existingCategory) {
          existingCategory.value += transaction.amount;
        } else {
          acc.push({ value: transaction.amount, name: transaction.category });
        }
        return acc;
      }, [])
      .sort((a, b) => b.name.localeCompare(a.name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['transactionDates'] &&
        changes['transactionDates'].currentValue?.length > 0) ||
      (changes['type'] && changes['type'].currentValue)
    ) {
      this.categories = this.translateCategoryToSpanish(
        this.collectCategoriesByTransactionType(this.type)
      );
    }
    this.updateChart();
  }

  private updateChart() {
    if (this.chart) this.removeChart();

    if (!this.chartContainer || this.categories.length === 0) return;

    this.chart = init(this.chartContainer.nativeElement);

    const categoryColors: Record<string, string> = {
      [this.literals.categories.home]: '#FF6384',
      [this.literals.categories.work]: '#36A2EB',
      [this.literals.categories.finances]: '#FFCE56',
      [this.literals.categories.food]: '#4BC0C0',
      [this.literals.categories.entertainment]: '#4D4DFF',
    };

    console.log(this.categories);

    let assignedColors = new Map<string, string>();

    this.categories.forEach((category) => {
      if (categoryColors[category.name]) {
        assignedColors.set(category.name, categoryColors[category.name]);
      }
    });

    const option = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      color: this.categories.map(
        (category) => assignedColors.get(category.name) || '#000000'
      ),
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false, position: 'center' },
          emphasis: {
            label: { show: true, fontSize: 40, fontWeight: 'bold' },
          },
          labelLine: { show: false },
          data: this.categories,
        },
      ],
    };

    this.chart.setOption(option);
  }

  private removeChart() {
    this.chart.dispose();
    this.chart = null;
  }

  private translateCategoryToSpanish(
    categories: CategoryType[]
  ): CategoryType[] {
    return categories.map((category) => {
      switch (category.name.toUpperCase()) {
        case 'HOME':
          return { ...category, name: this.literals.categories.home };
        case 'WORK':
          return { ...category, name: this.literals.categories.work };
        case 'FINANCES':
          return { ...category, name: this.literals.categories.finances };
        case 'FOOD':
          return { ...category, name: this.literals.categories.food };
        case 'ENTERTAINMENT':
          return { ...category, name: this.literals.categories.entertainment };
        default:
          return category;
      }
    });
  }
}
