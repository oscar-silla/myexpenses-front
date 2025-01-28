import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionDate } from '../../types/models/response/transaction-date/transaction-date.type';
import { TransactionDateResponse } from '../../types/models/response/transaction-date/transaction-date-response.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [MatListModule, MatDividerModule, RouterLink],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css',
})
export class TransactionsListComponent implements OnInit {
  @Input() type: string = 'EXPENSE';
  transactionDates: TransactionDate[] = [];

  constructor(private expensesService: TransactionService) {}

  ngOnInit(): void {
    this.expensesService.getTransactions().subscribe({
      next: (response: TransactionDateResponse) => {
        this.transactionDates = response.results;
      },
      error(err) {
        console.log('Error fetching expenses', err);
      },
      complete() {
        console.log('Fetching expenses complete');
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue) {
      this.type = changes['type'].currentValue;
    }
  }

  getTransactionDate(): TransactionDate[] {
    return this.transactionDates.filter((date) =>
      this.type === 'EXPENSE'
        ? date.expenses.length > 0
        : date.revenues.length > 0
    );
  }

  getTransactionDateAmountByDate(date: Date): Number {
    const transactionDate = this.transactionDates.find(
      (transactionDate) => transactionDate.date === date
    );
    return this.type === 'EXPENSE'
      ? transactionDate?.amount.expense!
      : transactionDate?.amount.revenue!;
  }
}
