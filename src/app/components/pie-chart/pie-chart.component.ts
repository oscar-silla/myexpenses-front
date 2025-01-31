import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { TransactionDate } from '../../types/models/response/transaction-date/transaction-date.type';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements AfterViewInit, OnChanges {
  @Input() transactionDates: TransactionDate[] = [];
  @Input() type: string = 'EXPENSE';
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  private getTransactionsByType(type: string) {
    return this.transactionDates.flatMap((date) =>
      type === 'EXPENSE' ? date.expenses : date.revenues
    );
  }

  private buildCategories(): { value: number; name: string }[] {
    const transactions = this.getTransactionsByType(this.type);
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.amount > 0
    );
    let results: { value: number; name: string }[] = [];
    filteredTransactions.forEach((transaction) => {
      let result: { value: number; name: string } | undefined = results.find(
        (r) => r.name === transaction.category
      );
      if (result) {
        result.value += transaction.amount;
      } else {
        results.push({
          value: transaction.amount,
          name: transaction.category,
        });
      }
    });
    console.log(results.sort((a, b) => b.name.localeCompare(a.name)));
    return results.sort((a, b) => b.name.localeCompare(a.name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['transactionDates'] &&
        changes['transactionDates'].currentValue?.length > 0) ||
      (changes['type'] && changes['type'].currentValue)
    ) {
      console.log('Updating categories...');
      this.categories = this.buildCategories();
      this.updateChart();
    }
  }

  categories: { value: number; name: string }[] = [];

  private updateChart() {
    if (!this.chartContainer || this.categories.length === 0) return;

    const myChart = echarts.init(this.chartContainer.nativeElement);

    const categoryColors: Record<string, string> = {
      HOME: '#FF6384',
      WORK: '#36A2EB',
      FINANCES: '#FFCE56',
      FOOD: '#4BC0C0',
      ENTERTAINMENT: '#4D4DFF',
    };

    const fallbackColors = [
      '#9966FF',
      '#FF9F40',
      '#FF4D4D',
      '#4DFF4D',
      '#4D4DFF',
    ];
    let assignedColors = new Map<string, string>();
    let fallbackIndex = 0;

    this.categories.forEach((category) => {
      console.log(category);
      if (categoryColors[category.name]) {
        assignedColors.set(category.name, categoryColors[category.name]);
      } else {
        // Si la categoría no tiene color asignado, usar uno de respaldo
        assignedColors.set(category.name, fallbackColors[fallbackIndex]);
        fallbackIndex = (fallbackIndex + 1) % fallbackColors.length; // Ciclar colores si hay más categorías
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

    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
  }

  ngAfterViewInit() {
    this.updateChart();
  }
}
