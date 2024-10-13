import { Component, Input, OnInit, output } from '@angular/core';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionService } from '../../services/transaction.service';
import { ExpenseResponse } from '../../types/models/response/expense/expense-response.type';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionFormComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  @Input() id = '';
  expense?: ExpenseResponse;
  operationType: string = '';

  constructor(private expenseService: TransactionService) {}

  ngOnInit(): void {
    if (this.id) {
      this.operationType = 'modify';
      this.fetchAndSetExpense(this.id);
    }
  }

  private fetchAndSetExpense(id: string) {
    this.expenseService.getTransaction(id).subscribe({
      next: (res: ExpenseResponse) => {
        this.expense = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
