import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class ErrorService {
   constructor() {}

   getClientMessage(error: Error): string {
      if (!navigator.onLine) {
         return 'No Internet Connection';
      }
      return error.message ? error.message : error.toString();
   }

   getClientStack(error: Error): string | undefined {
      return error.stack;
   }

   getServerMessage(error: HttpErrorResponse): string {
      return error.error.message ? error.error.message : error.message;
   }

   getServerStack(error: HttpErrorResponse): string {
      return `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
}
