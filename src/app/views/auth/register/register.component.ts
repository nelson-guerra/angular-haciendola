import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/common/notification.service';
import { AuthService } from '../../../services/auth.service';

@Component({
   selector: 'app-register',
   standalone: true,
   imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
   templateUrl: './register.component.html',
   styleUrl: './register.component.scss',
})
export class RegisterComponent {
   private readonly _notificationService = inject(NotificationService);
   private readonly _router = inject(Router);
   private readonly _authService = inject(AuthService);

   registerForm = new FormGroup({
      name: new FormControl('', { validators: Validators.required, nonNullable: true }),
      email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl('', { validators: Validators.required, nonNullable: true }),
   });

   get nameField(): FormControl<string> {
      return this.registerForm.controls.name;
   }

   get emailField(): FormControl<string> {
      return this.registerForm.controls.email;
   }

   get passwordField(): FormControl<string> {
      return this.registerForm.controls.password;
   }

   sendFormData(): void {
      if (this.registerForm.valid) {
         const { name, email, password } = this.registerForm.getRawValue();

         this._authService.registerUser(name, email, password).subscribe({
            next: data => {
               if (data.status) {
                  this._notificationService.showSuccess(
                     'Successfully registered. Now you can log in with your email and password',
                  );
               }
               this._router.navigate(['/auth']);
            },
         });
      }
   }

   cancel(): void {
      this._router.navigate(['/auth']);
   }
}
