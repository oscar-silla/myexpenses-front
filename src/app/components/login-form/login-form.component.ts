import {
  Component,
  EventEmitter,
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
  hide = signal(true);
  literals = LITERALS;
  formGroup = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  constructor(private authService: AuthService) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    this.authService
      .login(this.mapToAuthCredentials(this.formGroup))
      .subscribe({
        next: (token) => {
          console.log('Token', token);
        },
        error: (err) => {
          console.log('Error logging in', err);
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
