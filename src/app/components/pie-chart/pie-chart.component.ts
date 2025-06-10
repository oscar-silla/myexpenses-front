import {
  Component,
  ElementRef,
  Input,
  OnChanges,
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
import { LITERALS } from '../../constants/literals';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';

use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

type CategoryType = { value: number; name: string; color: string };

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnChanges {
  @Input() transactions: TransactionResponse[] = [];
  @Input() type: string = 'EXPENSE';
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  literals = LITERALS;
  private categories: CategoryType[] = [];
  private chart: any | null = null;

  private collectCategoriesByTransactionType(type: string): CategoryType[] {
    return this.transactions
      .filter(
        (transaction) => transaction.type === type && transaction.amount > 0
      )
      .reduce((acc: CategoryType[], transaction) => {
        const existingCategory = acc.find(
          (cat) => cat.name === transaction.category.name
        );
        if (existingCategory) {
          existingCategory.value += transaction.amount;
        } else {
          acc.push({
            value: transaction.amount,
            name: transaction.category.name,
            color: transaction.category.color,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => b.name.localeCompare(a.name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['transactions'] &&
        changes['transactions'].currentValue?.length > 0) ||
      (changes['type'] && changes['type'].currentValue)
    ) {
      this.categories = this.collectCategoriesByTransactionType(this.type);
    }
    this.updateChart();
  }

  private updateChart() {
    if (this.chart) this.removeChart();

    if (!this.chartContainer || this.categories.length === 0) return;

    this.chart = init(this.chartContainer.nativeElement);

    let assignedColors = new Map<string, string>();

    this.categories.forEach((category) => {
      if (category.color) {
        assignedColors.set(category.name, category.color);
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
}
