import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { ExpenseRequest } from '../../types/models/request/expense/expense-request.type';
import { Router } from '@angular/router';
import { ExpenseResponse } from '../../types/models/response/expense/expense-response.type';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

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
    CommonModule,
    ReactiveFormsModule,
    DialogComponent,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnChanges {
  @Input() expense?: ExpenseResponse;
  @Input() operationType?: string;
  readonly dialog = inject(MatDialog);

  constructor(
    private expenseService: TransactionService,
    private router: Router
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.expenseService.delete(this.expense!.id.toString()).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log('Error deleting expense', err);
          },
        });
      }
    });
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expense'] && changes['expense'].currentValue) {
      this.expense && this.setFormValues(this.expense);
    }
  }

  private setFormValues(expense: ExpenseResponse) {
    this.profileForm.patchValue({
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
    });
  }

  onCreate() {
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

  onModify() {
    const expenseResquest = this.mapToExpenseRequest(
      this.profileForm.value as FormFields
    );
    expenseResquest.date = this.expense!.date;
    this.expenseService
      .modify(this.expense!.id.toString(), expenseResquest)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Error modifying expense', err);
        },
      });
  }

  private mapToExpenseRequest(formValues: FormFields): ExpenseRequest {
    return {
      ...formValues,
      date: new Date(),
    };
  }

  formValuesChanged(): boolean {
    const currentFormValues = this.profileForm.value;
    return (
      currentFormValues.amount !== this.expense?.amount ||
      currentFormValues.category !== this.expense?.category ||
      currentFormValues.description !== this.expense?.description
    );
  }
}
