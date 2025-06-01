import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LITERALS } from '../../constants/literals';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';
import { ActivateUserRequest } from '../../types/models/request/user/user-activate.-request.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/alert/alert.component';
import { Router } from '@angular/router';
import { SecureStorageService } from '../../services/storage/secure-storage.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-verification-form',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButton,
        MatProgressSpinnerModule,
    ],
    templateUrl: './verification-form.component.html',
    styleUrl: './verification-form.component.css'
})
export class VerificationFormComponent {
  literals = LITERALS;
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private secureStorageService = inject(SecureStorageService);
  formGroup = new FormGroup({
    code: new FormControl<string>(''),
  });
  protected showSpinner = signal(false);

  onSubmit() {
    this.showSpinner.set(true);
    const request = this.mapToActivateUserRequest(this.formGroup.value);
    request.email = this.userService.getEmail();
    this.userService.activate(request).subscribe({
      next: async (res) => {
        if (res.status === 200) {
          this.snackBar.openFromComponent(AlertComponent, {
            duration: 3000,
            data: { message: 'Usuario validado correctamente' },
            panelClass: ['snackbar-success'],
          });
          await this.secureStorageService.setItem('token', res.body.token);
          this.router.navigate(['/inicio']);
          this.showSpinner.set(false);
        }
      },
      error: () => {
        this.snackBar.openFromComponent(AlertComponent, {
          duration: 3000,
          data: { message: 'El código no es correcto' },
          panelClass: ['snackbar-success'],
        });
        this.showSpinner.set(false);
      },
      complete: () => {
        console.log('Activating user complete');
      },
    });
  }

  private mapToActivateUserRequest(formValue: any): ActivateUserRequest {
    return {
      email: this.userService.getEmail(),
      code: formValue.code,
    };
  }
}
