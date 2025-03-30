import { Component } from '@angular/core';
import { VerificationFormComponent } from '../../components/verification-form/verification-form.component';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [VerificationFormComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css',
})
export class VerificationComponent {}
