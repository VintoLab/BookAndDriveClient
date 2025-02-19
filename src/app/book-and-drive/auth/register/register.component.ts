import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask'
import { RegisterModel } from '../models/register.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  form: FormGroup
  phoneNumberInputPrefix: string = '+380';
  isPasswordHidden = true;

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onRegister() {
    const inputtedData: RegisterModel = this.form.value;
    inputtedData.phoneNumber = this.processInputtedPhoneNumber(inputtedData.phoneNumber);
    console.log(inputtedData);
  }

  private processInputtedPhoneNumber(phoneNumber: string): string {
    return this.phoneNumberInputPrefix + phoneNumber;
  }
}
