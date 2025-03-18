import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { LITERALS } from '../../constants/literals';
import { UserService } from '../../services/user.service';
import { UserRequest } from '../../types/models/request/user/user-request.type';

@Component({
  selector: 'app-registration-form',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  literals = LITERALS;
  formGroup = new FormGroup(
    {
      name: new FormControl<string>(''),
      firstSurname: new FormControl<String>(''),
      secondSurname: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
      confirmPassword: new FormControl<string>(''),
    },
    { validators: this.passwordsMatchValidator() }
  );

  constructor(private userService: UserService) {}

  protected onSubmit() {
    this.userService
      .save(this.mapToUserRequest(this.formGroup.value))
      .subscribe({
        next: () => {
          console.log('User created successfully');
        },
        error: (err) => {
          console.log('Error creating user', err);
        },
        complete: () => {
          console.log('Creating user complete');
        },
      });
  }

  private mapToUserRequest(formValue: any): UserRequest {
    return {
      name: formValue.name,
      firstSurname: formValue.firstSurname,
      secondSurname: formValue.secondSurname,
      email: formValue.email,
      password: formValue.password,
    };
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsDontMatch: true };
    };
  }
}
