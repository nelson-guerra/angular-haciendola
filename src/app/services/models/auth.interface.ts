import { jwtDecode } from 'jwt-decode';

export interface ILoginHttpResponse {
   status: boolean;
   message: string;
   data: { token: string; refreshToken: string };
}

export interface IRegisterHttpResponse {
   status: boolean;
   message: string;
   data: { id: string };
}

export interface IRefreshTokenHttpResponse {
   status: boolean;
   message: string;
   data: { token: string };
}

export interface IUser {
   id: string;
   email: string;
}
