import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const apiInterceptor: HttpInterceptorFn = (
   req: HttpRequest<unknown>,
   next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
   const authService = inject(AuthService);

   if (req.url.includes('login')) {
      return next(req);
   }

   const requestCloned = authService.setAuthorizationHeader(req);

   return next(requestCloned);
};
