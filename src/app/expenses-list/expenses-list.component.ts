import { Component, OnInit } from '@angular/core';
import { Expense } from '../interfaces/expense.interface';
import { ExpensesService } from '../services/expenses.service';
import { Pagination } from '../interfaces/pagination.interface';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css',
})
export class ExpensesListComponent implements OnInit {
  title = 'Expenses list';
  expenses: Expense[] = [];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.expensesService.getExpenses().subscribe({
      next: (expenses: { results: [Expense]; pagination: Pagination }) => {
        this.expenses = expenses.results;
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
