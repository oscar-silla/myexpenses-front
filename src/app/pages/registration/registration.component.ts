import { Component } from '@angular/core';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import 'animate.css';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RegistrationFormComponent, LoginFormComponent, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  protected isLoginMode: boolean = false;

  protected toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
