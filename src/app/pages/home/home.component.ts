import { Component } from '@angular/core';
import { TransactionsListComponent } from '../../components/transactions-list/transactions-list.component';
import { FabButtonComponent } from '../../components/fab-button/fab-button.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TransactionsListComponent, FabButtonComponent, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  transactionType: string = 'EXPENSE';
  transactionTypes: string[] = ['EXPENSE', 'REVENUE'];

  setTransactionType($event: MatTabChangeEvent): void {
    this.transactionType = this.transactionTypes[$event.index];
  }
}
