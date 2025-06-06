import { Component, Input, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionDate } from '../../types/models/response/transaction-date/transaction-date.type';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-transactions-list',
    imports: [
        CommonModule,
        MatListModule,
        MatDividerModule,
        RouterLink,
        MatProgressSpinnerModule,
    ],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  @Input() type: string = 'EXPENSE';
  @Input() transactionDates: TransactionDate[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue) {
      this.type = changes['type'].currentValue;
    }
  }

  protected getTransactionDate(): TransactionDate[] {
    return this.transactionDates.filter((date) =>
      this.type === 'EXPENSE'
        ? date.expenses.length > 0
        : date.revenues.length > 0
    );
  }

  protected getTransactionDateAmountByDate(date: Date): Number {
    const transactionDate = this.transactionDates.find(
      (transactionDate) => transactionDate.date === date
    );
    return this.type === 'EXPENSE'
      ? transactionDate?.amount.expense!
      : transactionDate?.amount.revenue!;
  }
}
