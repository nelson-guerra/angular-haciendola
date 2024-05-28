import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError, concatMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/common/notification.service';
import { ErrorService } from '../services/common/error.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   const authService = inject(AuthService);
   const notificationService = inject(NotificationService);
   const errorService = inject(ErrorService);

   return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
         let errorMessage;

         if (error.error instanceof ErrorEvent) {
            console.log('client error', errorService.getClientStack(error));
            errorMessage = errorService.getClientMessage(error);
         } else {
            console.log('server error', errorService.getServerStack(error));
            errorMessage = errorService.getServerMessage(error);

            if (error.status === 0) {
               notificationService.showError('No connection to data server');
               authService.logout();
               return EMPTY;
            }

            if (error.status === 401) {
               notificationService.showError(errorMessage);
               authService.logout();
            } else if (error.status === 403) {
               return authService.getRefreshTokenFromServer().pipe(
                  concatMap((data: any) => {
                     authService.updateAccessToken(data.data.token);
                     const requestCloned = authService.setAuthorizationHeader(req);
                     return next(requestCloned);
                  }),
                  catchError((error: HttpErrorResponse) => {
                     notificationService.showError(errorService.getServerMessage(error));
                     authService.logout();
                     return EMPTY;
                  }),
               );
            }
         }

         notificationService.showError(errorMessage);
         return EMPTY;
      }),
   );
};
