import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
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
import { UserRequest } from '../../types/models/request/user/user-request.type';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/alert/alert.component';

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
  showEmailAlert: boolean = false;
  showErrorAlert: boolean = false;
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
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

  protected onSubmit() {
    this.userService
      .save(this.mapToUserRequest(this.formGroup.value))
      .subscribe({
        next: (res) => {
          if (res.status === 201) {
            console.log('User created successfully');
            this.showEmailAlert = true;
            this.snackBar.openFromComponent(AlertComponent, {
              duration: 3000,
              data: { message: 'Se ha enviado un correo de confirmación' },
              panelClass: ['snackbar-success'],
            });
            setTimeout(() => {
              this.showEmailAlert = false;
            }, 3000);
          } else {
            this.showErrorAlert = true;
            this.snackBar.openFromComponent(AlertComponent, {
              duration: 3000,
              data: { message: 'Error al crear el usuario' },
              panelClass: ['snackbar-error'],
            });
            setTimeout(() => {
              this.showErrorAlert = false;
            }, 3000);
          }
        },
        error: (err) => {
          this.showErrorAlert = true;
          this.snackBar.openFromComponent(AlertComponent, {
            duration: 3000,
            data: { message: 'Error al crear el usuario' },
            panelClass: ['snackbar-error'],
          });
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 3000);
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
