import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TransactionSummary } from '../../../../types/models/response/TransactionSummary.type';
import { LITERALS } from '../../../../constants/literals';

@Component({
    selector: 'app-transaction-summary',
    imports: [MatCardModule],
    templateUrl: './transaction-summary.component.html',
    styleUrl: './transaction-summary.component.css'
})
export class TransactionSummaryComponent implements OnInit {
  @Input() transactionSummary!: TransactionSummary;
  literals = LITERALS;
  totalRevenue: number = 0;
  totalExpense: number = 0;
  totalMoney: number = 0;

  ngOnInit(): void {
    this.totalRevenue = this.transactionSummary.totalRevenue;
    this.totalExpense = this.transactionSummary.totalExpense;
    this.totalMoney =
      this.transactionSummary.totalRevenue -
      this.transactionSummary.totalExpense;
  }
}
