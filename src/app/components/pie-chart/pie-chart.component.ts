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
import { Transaction } from '../../types/domain/transaction.type';

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

  private sumByCategory(category: string, transactions: Transaction[]): number {
    return transactions
      .filter((transaction) => transaction.category === category)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

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
    let result: { value: number; name: string }[] = [];
    filteredTransactions.forEach((transaction) => {
      result.push({
        value: this.sumByCategory(transaction.category, filteredTransactions),
        name: transaction.category,
      });
    });
    console.log(result);
    return result;
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
    const option = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
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
