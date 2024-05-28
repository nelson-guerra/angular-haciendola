import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product, ProductHttpResponse } from './models/product.interface';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
   providedIn: 'root',
})
export class ProductsService {
   private readonly URL_PRODUCTS = `${environment.domain}/products`;

   httpCLient = inject(HttpClient);
   httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };

   constructor() {}

   getProducts(): Observable<Product[]> {
      return this.httpCLient
         .get<ProductHttpResponse>(this.URL_PRODUCTS, this.httpOptions)
         .pipe(map(data => data.data as Product[]));
   }

   getProduct(id: string): Observable<Product> {
      let endpoint = `${this.URL_PRODUCTS}/${id}`;
      return this.httpCLient
         .get<ProductHttpResponse>(endpoint, this.httpOptions)
         .pipe(map(data => data.data as Product));
   }

   addProduct(data: Product): Observable<string> {
      return this.httpCLient
         .post<ProductHttpResponse>(this.URL_PRODUCTS, data, this.httpOptions)
         .pipe(map(data => data.message));
   }

   updateProduct(data: Product, id: string): Observable<string> {
      let endpoint = `${this.URL_PRODUCTS}/${id}`;
      return this.httpCLient.put<ProductHttpResponse>(endpoint, data, this.httpOptions).pipe(map(data => data.message));
   }

   deleteProduct(id: string): Observable<string> {
      let endpoint = `${this.URL_PRODUCTS}/${id}`;
      return this.httpCLient.delete<ProductHttpResponse>(endpoint, this.httpOptions).pipe(map(data => data.message));
   }
}
