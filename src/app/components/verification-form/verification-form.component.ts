import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LITERALS } from '../../constants/literals';
import { MatButton } from '@angular/material/button';

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
  formGroup = new FormGroup({
    code: new FormControl<string>(''),
  });

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
