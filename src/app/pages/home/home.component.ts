import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionsListComponent } from '../../components/transactions-list/transactions-list.component';
import { TransactionSummaryComponent } from '../../components/adhoc/transaction/transaction-summary/transaction-summary.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { FabButtonComponent } from '../../components/fab-button/fab-button.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params } from '@angular/router';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionSummary } from '../../types/models/response/TransactionSummary.type';
import { LITERALS } from '../../constants/literals';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransactionsResponse } from '../../types/models/response/transaction-date/transactions-response.type';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  imports: [
    TransactionsListComponent,
    TransactionSummaryComponent,
    PieChartComponent,
    FabButtonComponent,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  literals = LITERALS;
  transactionType: string = 'EXPENSE';
  transactionTypes: string[] = ['EXPENSE', 'REVENUE'];
  transactionTypeIndex?: number;
  transactions: TransactionResponse[] = [];
  isLoading: boolean = false;
  transactionSummary: TransactionSummary = {
    totalExpense: 0,
    totalRevenue: 0,
    totalMoney: 0,
    isLoaded: false,
  };

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.subscribe((params: Params) => {
      const type = params['type'];
      if (type) {
        this.transactionTypeIndex = this.transactionTypes.indexOf(type);
        this.transactionType = type;
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (response: TransactionsResponse) => {
        this.transactions = response.results;
        this.transactionSummary = { ...response.summary, isLoaded: true };
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error fetching expenses', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Fetching expenses complete');
        this.isLoading = false;
      },
    });
  }

  setTransactionType($event: MatTabChangeEvent): void {
    this.transactionType = this.transactionTypes[$event.index];
  }
}
