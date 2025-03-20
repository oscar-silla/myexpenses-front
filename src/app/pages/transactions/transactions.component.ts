import { Component, Input, OnInit } from '@angular/core';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionResponse } from '../../types/models/response/transaction/transaction-response.type';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionFormComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  @Input() id = '';
  transaction?: TransactionResponse;
  operationType: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    if (this.id) {
      this.operationType = 'modify';
      this.fetchAndSetTransaction(this.id);
    }
  }

  private fetchAndSetTransaction(id: string) {
    this.transactionService.getTransaction(id).subscribe({
      next: (res: TransactionResponse) => {
        this.transaction = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
