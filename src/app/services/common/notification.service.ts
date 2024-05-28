import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root',
})
export class NotificationService {
   private readonly _snackBar = inject(MatSnackBar);

   constructor() {}

   showSuccess(message: string): void {
      this._snackBar.open(message, 'Close', {
         horizontalPosition: 'start',
         verticalPosition: 'bottom',
         duration: 4000,
      });
   }

   showError(message: string): void {
      this._snackBar.open(message, 'Close', {
         horizontalPosition: 'start',
         verticalPosition: 'bottom',
         duration: 4000,
      });
   }
}
