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
import { TransactionDate } from '../../types/models/response/expense-date/transaction-date.type';
import { TransactionDateResponse } from '../../types/models/response/expense-date/transaction-date-response.type';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
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
}
