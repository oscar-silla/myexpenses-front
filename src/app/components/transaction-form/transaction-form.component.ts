import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    category: new FormControl(''),
    amount: new FormControl(''),
    description: new FormControl(''),
  });

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
