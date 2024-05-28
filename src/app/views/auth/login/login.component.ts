import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/common/notification.service';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.scss',
})
export class LoginComponent {
   private readonly _notificationService = inject(NotificationService);
   private readonly _router = inject(Router);
   private readonly _authService = inject(AuthService);

   loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl('', { validators: Validators.required, nonNullable: true }),
   });

   get emailField(): FormControl<string> {
      return this.loginForm.controls.email;
   }

   get passwordField(): FormControl<string> {
      return this.loginForm.controls.password;
   }

   sendFormData(): void {
      if (this.loginForm.valid) {
         const { email, password } = this.loginForm.getRawValue();

         this._authService.login(email, password).subscribe({
            next: data => {
               this._notificationService.showSuccess(data.message);
               this._authService.saveTokens(data.data.token, data.data.refreshToken);
               this._router.navigate(['/products']);
            },
         });
      }
   }

   register(): void {
      this._router.navigate(['/auth/register']);
   }
}
