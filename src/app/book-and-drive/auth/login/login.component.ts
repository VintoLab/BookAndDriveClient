import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../../../core/models/jwt-payload.model';
import { JwtService } from '../../../core/services/jwt.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/enums/user-role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  localStorageService = inject(LocalStorageService);
  authService = inject(AuthService);
  jwtService = inject(JwtService);
  router = inject(Router);
  fb = inject(FormBuilder);

  form: FormGroup
  isPasswordHidden = true;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onLogin() {
    this.isLoading = true;
    const inputtedData: LoginModel = this.form.value;

    this.authService.login(inputtedData).subscribe({
      next: (data) => {
        this.localStorageService.setToken(data.token);
        const payload: JwtPayload = this.jwtService.getPayload(data.token);
        this.isLoading = false;
        this.navigateUserBasedOnRole(payload.role);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error
      }
    });
  }

  private navigateUserBasedOnRole(role: string) {
    if (role == UserRole.Admin) {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['']);
    }
  }
}
