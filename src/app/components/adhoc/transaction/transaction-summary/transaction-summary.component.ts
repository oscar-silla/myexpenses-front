import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TransactionSummary } from '../../../../types/models/response/TransactionSummary.type';
import { LITERALS } from '../../../../constants/literals';
import { roundToTwoDecimals } from '../../../../../utils/utils';

@Component({
  selector: 'app-transaction-summary',
  imports: [MatCardModule],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.css',
})
export class TransactionSummaryComponent implements OnInit {
  @Input() transactionSummary!: TransactionSummary;
  literals = LITERALS;
  totalRevenue: number = 0;
  totalExpense: number = 0;
  totalMoney: number = 0;

  ngOnInit(): void {
    this.totalRevenue = roundToTwoDecimals(
      this.transactionSummary.totalRevenue
    );
    this.totalExpense = roundToTwoDecimals(
      this.transactionSummary.totalExpense
    );
    this.totalMoney = roundToTwoDecimals(
      this.transactionSummary.totalRevenue -
        this.transactionSummary.totalExpense
    );
  }
}
