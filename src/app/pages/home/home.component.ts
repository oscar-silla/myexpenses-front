import { Component, OnInit } from '@angular/core';
import { TransactionsListComponent } from '../../components/transactions-list/transactions-list.component';
import { FabButtonComponent } from '../../components/fab-button/fab-button.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const type = params['type'];
      if (type) {
        this.transactionTypeIndex = this.transactionTypes.indexOf(type);
        this.transactionType = type;
      }
    });
  }

  setTransactionType($event: MatTabChangeEvent): void {
    this.transactionType = this.transactionTypes[$event.index];
  }
}
