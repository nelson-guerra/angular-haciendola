import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/common/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
   const authService = inject(AuthService);
   const notificationService = inject(NotificationService);

   if (!authService.isLoggedIn()) {
      notificationService.showError("You don't have permissions. Enter your credentials");
      router.navigate(['/auth']);
   }

   return true;
};
