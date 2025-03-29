import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatSnackBarModule, MatFormFieldModule, MatInputModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string }
  ) {}
}
