import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ExpenseDate } from '../../types/models/response/expense-date/expense-date.type';
import { ExpenseDateResponse } from '../../types/models/response/expense-date/expense-date-response.type';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [MatListModule, MatDividerModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css',
})
export class ExpensesListComponent implements OnInit {
  title = 'Expenses list';
  expenseDates: ExpenseDate[] = [];

  constructor(private expensesService: ExpenseService) {}

  ngOnInit(): void {
    this.expensesService.getExpenses().subscribe({
      next: (response: ExpenseDateResponse) => {
        this.expenseDates = response.results;
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
