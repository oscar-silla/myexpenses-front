import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
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
  @Output() switchToLogin = new EventEmitter<void>();
  @Output() switchToVerification = new EventEmitter<void>();
  literals = LITERALS;
  protected showEmailAlert = signal(false);
  protected showErrorAlert = signal(false);
  protected showSpinner = signal(false);
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
    const user: UserRequest = this.mapToUserRequest(this.formGroup.value);
    this.showSpinner.set(true);
    this.userService.save(user).subscribe({
      next: (res) => {
        if (res.status === 201) {
          this.showSpinner.set(false);
          this.showEmailAlert.set(true);
          this.snackBar.openFromComponent(AlertComponent, {
            duration: 3000,
            data: { message: 'Se ha enviado un correo de confirmación' },
            panelClass: ['snackbar-success'],
          });
          this.userService.setEmail(user.email);
          this.switchToVerification.emit();
          this.showSpinner.set(false);
          setTimeout(() => {
            this.showEmailAlert.set(false);
            this.formGroup.reset();
          }, 3000);
        }
      },
      error: (err) => {
        this.showSpinner.set(false);
        switch (err.status) {
          case 409:
            this.showErrorAlert.set(true);
            this.snackBar.openFromComponent(AlertComponent, {
              duration: 3000,
              data: { message: 'El correo electrónico ya está registrado' },
              panelClass: ['snackbar-error'],
            });
            setTimeout(() => {
              this.showErrorAlert.set(false);
            }, 3000);
            break;
          case 429:
            this.showErrorAlert.set(true);
            this.snackBar.openFromComponent(AlertComponent, {
              duration: 3000,
              data: {
                message:
                  'Demasiados intentos, debe esperar 5 minutos para ingresar el mismo correo',
              },
              panelClass: ['snackbar-error'],
            });
            setTimeout(() => {
              this.showErrorAlert.set(false);
            }, 3000);
            break;
          default:
            this.showErrorAlert.set(true);
            this.snackBar.openFromComponent(AlertComponent, {
              duration: 3000,
              data: { message: 'Error al crear el usuario' },
              panelClass: ['snackbar-error'],
            });
            setTimeout(() => {
              this.showErrorAlert.set(false);
            }, 3000);
            break;
        }
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

  protected onLoginClick = (e: Event): void => {
    e.preventDefault();
    this.switchToLogin.emit();
  };
}
