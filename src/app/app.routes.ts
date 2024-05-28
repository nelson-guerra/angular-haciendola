import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { AuthContentComponent } from './layouts/auth-content/auth-content.component';

export const routes: Routes = [
   {
      path: 'auth',
      component: AuthContentComponent,
      children: [
         { path: '', component: LoginComponent },
         {
            path: 'register',
            loadComponent: () => import('./views/auth/register/register.component').then(c => c.RegisterComponent),
         },
      ],
   },
   {
      path: 'products',
      loadChildren: () => import('./views/products/product.routes').then(r => r.ProductRoutes),
   },
   { path: '', redirectTo: 'products', pathMatch: 'full' },
   { path: 'login', redirectTo: 'auth', pathMatch: 'prefix' },
   { path: 'auth/login', redirectTo: 'auth', pathMatch: 'full' },
   {
      path: '**',
      loadComponent: () => import('./views/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
   },
];
