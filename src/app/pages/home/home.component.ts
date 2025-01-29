import { Component, OnInit } from '@angular/core';
import { TransactionsListComponent } from '../../components/transactions-list/transactions-list.component';
import { FabButtonComponent } from '../../components/fab-button/fab-button.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDateResponse } from '../../types/models/response/transaction-date/transaction-date-response.type';
import { TransactionDate } from '../../types/models/response/transaction-date/transaction-date.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TransactionsListComponent, FabButtonComponent, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  transactionType: string = 'EXPENSE';
  transactionTypes: string[] = ['EXPENSE', 'REVENUE'];
  transactionTypeIndex?: number;
  transactionDates: TransactionDate[] = [];

  constructor(
    private route: ActivatedRoute,
    private expensesService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const type = params['type'];
      if (type) {
        this.transactionTypeIndex = this.transactionTypes.indexOf(type);
        this.transactionType = type;
      }
    });

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

  setTransactionType($event: MatTabChangeEvent): void {
    this.transactionType = this.transactionTypes[$event.index];
  }
}
