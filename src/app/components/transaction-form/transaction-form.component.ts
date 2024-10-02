import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseRequest } from '../../types/models/request/expense/expense-request.type';
import { Router } from '@angular/router';

type FormFields = {
  category: string;
  amount: number;
  description: string;
};

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  readonly categories: string[] = [
    'Food',
    'Home',
    'Financies',
    'Work',
    'Entertainment',
  ];

  profileForm = new FormGroup({
    category: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    description: new FormControl<string>(''),
  });

  constructor(private expenseService: ExpenseService, private router: Router) {}

  onSubmit() {
    const expenseResquest = this.mapToExpenseRequest(
      this.profileForm.value as FormFields
    );
    this.expenseService.save(expenseResquest).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Error saving expense', err);
      },
    });
  }

  private mapToExpenseRequest(formValues: FormFields): ExpenseRequest {
    return {
      ...formValues,
      date: new Date(),
    };
  }
}
