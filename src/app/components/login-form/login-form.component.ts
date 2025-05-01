import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LITERALS } from '../../constants/literals';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentials } from '../../types/models/request/auth/auth-credentials.type';
import { SecureStorageService } from '../../services/storage/secure-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/alert/alert.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login-form',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() private switchToRegister = new EventEmitter<void>();
  @Output() switchToVerification = new EventEmitter<void>();
  private snackBar = inject(MatSnackBar);
  private secureStorageService = inject(SecureStorageService);
  private router = inject(Router);
  hide = signal(true);
  literals = LITERALS;
  formGroup = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    const credentials: AuthCredentials = this.mapToAuthCredentials(
      this.formGroup
    );
    this.authService.login(credentials).subscribe({
      next: async (res) => {
        await this.secureStorageService.setItem('token', res.token);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        switch (err.status) {
          case 401:
            this.authService.resendVerificationCode(credentials).subscribe({
              next: () => {
                this.userService.setEmail(credentials.email);
                this.switchToVerification.emit();
                this.snackBar.openFromComponent(AlertComponent, {
                  duration: 3000,
                  data: {
                    message: 'Se ha enviado un correo de confirmación',
                  },
                  panelClass: ['snackbar-success'],
                });
              },
              error: (err) => {
                console.log('Error resending verification code', err);
              },
              complete: () => {
                console.log('Resending verification code complete');
              },
            });
            break;
          default:
            console.log('Error logging in', err);
            break;
        }
      },
      complete: () => {
        console.log('Logging in complete');
      },
    });
  }

  private mapToAuthCredentials(formGroup: FormGroup): AuthCredentials {
    return {
      email: formGroup.get('email')?.value,
      password: formGroup.get('password')?.value,
    };
  }

  protected onClickRegister(event: Event) {
    event.preventDefault();
    this.switchToRegister.emit();
  }
}
