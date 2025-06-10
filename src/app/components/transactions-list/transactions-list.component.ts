import { Component, Input, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';

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
  styleUrl: './transactions-list.component.css',
})
export class TransactionsListComponent {
  @Input() type: string = 'EXPENSE';
  @Input() transactions: TransactionResponse[] = [];

  transactionDates: Date[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue) {
      this.type = changes['type'].currentValue;
    }
  }

  protected getTransactionDates(): Date[] {
    const filteredTransactionsByType = this.transactions.filter((transaction) =>
      this.type === 'EXPENSE'
        ? transaction.type === 'EXPENSE'
        : transaction.type === 'REVENUE'
    );
    if (filteredTransactionsByType.length !== 0) {
      const uniqueDates: Date[] = [
        ...new Set(
          filteredTransactionsByType.map((transaction) => transaction.date)
        ),
      ];

      return uniqueDates.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
    } else {
      return [];
    }
  }

  protected getTransactionDateAmountByDate(date: Date): number {
    const transactions: TransactionResponse[] = this.transactions.filter(
      (transaction) => transaction.date === date
    );

    return this.type === 'EXPENSE'
      ? transactions.reduce(
          (acc, transaction) =>
            Math.round(acc + transaction.amount * 100) / 100,
          0
        )
      : transactions.reduce(
          (acc, transaction) =>
            Math.round(acc + transaction.amount * 100) / 100,
          0
        );
  }

  protected getTransactionsByDateAndType(date: Date): TransactionResponse[] {
    return this.transactions.filter(
      (transaction) =>
        transaction.date === date && transaction.type === this.type
    );
  }
}
