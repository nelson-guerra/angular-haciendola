import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IUser, IRefreshTokenHttpResponse, ILoginHttpResponse, IRegisterHttpResponse } from './models/auth.interface';
import { StorageAdapter } from '../storage/storage.adapter';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private readonly URL_USERS = `${environment.domain}`;
   private readonly _storage = inject(StorageAdapter);
   private readonly _router = inject(Router);

   httpCLient = inject(HttpClient);
   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };

   constructor() {}

   login(email: string, password: string): Observable<ILoginHttpResponse> {
      const endpoint = `${this.URL_USERS}/auth/login`;
      return this.httpCLient.post<ILoginHttpResponse>(endpoint, { email, password }, this.httpOptions);
   }

   registerUser(name: string, email: string, password: string): Observable<IRegisterHttpResponse> {
      const endpoint = `${this.URL_USERS}/users`;
      return this.httpCLient.post<IRegisterHttpResponse>(endpoint, { name, email, password }, this.httpOptions);
   }

   saveTokens(accessToken: string, refreshToken: string): void {
      this._storage.save('accessToken', accessToken);
      this._storage.save('refreshToken', refreshToken);
   }

   updateAccessToken(accessToken: string): void {
      this._storage.save('accessToken', accessToken);
   }

   setAuthorizationHeader(req: HttpRequest<unknown>): HttpRequest<unknown> {
      const token = this._storage.get('accessToken');
      return req.clone({
         headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
   }

   getInfoUser(): IUser {
      const token = this._storage.get('accessToken');
      let data = {} as IUser;

      if (token) {
         const payload: IUser = jwtDecode(token);
         data = {
            id: payload.id,
            email: payload.email,
         };
      }

      return data;
   }

   isLoggedIn(): boolean {
      return this._storage.get('accessToken') ? true : false;
   }

   logout(): void {
      this._storage.clear();
      this._router.navigate(['/auth/login']);
   }

   getRefreshTokenFromServer(): Observable<IRefreshTokenHttpResponse> {
      const token = this._storage.get('refreshToken');
      const endpoint = `${this.URL_USERS}/auth/refresh`;
      return this.httpCLient.post<IRefreshTokenHttpResponse>(endpoint, { token }, this.httpOptions);
   }
}
