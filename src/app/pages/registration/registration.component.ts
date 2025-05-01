import { Component } from '@angular/core';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import 'animate.css';
import { VerificationFormComponent } from '../../components/verification-form/verification-form.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RegistrationFormComponent,
    LoginFormComponent,
    VerificationFormComponent,
    CommonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  protected isLoginMode: boolean = true;
  protected isVerificationMode: boolean = false;

  protected toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  protected toggleVerificationMode() {
    this.isVerificationMode = !this.isVerificationMode;
  }
}
