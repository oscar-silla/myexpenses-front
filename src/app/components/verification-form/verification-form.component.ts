import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LITERALS } from '../../constants/literals';
import { MatButton } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';
import { ActivateUserRequest } from '../../types/models/request/user/user-activate.-request.type';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-verification-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './verification-form.component.html',
  styleUrl: './verification-form.component.css',
})
export class VerificationFormComponent {
  literals = LITERALS;
  private userService = inject(UserService);
  formGroup = new FormGroup({
    code: new FormControl<string>(''),
  });

  onSubmit() {
    this.userService
      .activate(this.mapToActivateUserRequest(this.formGroup.value))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            console.log('User activated successfully');
          }
        },
        error: (err) => {
          console.log(err);
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
