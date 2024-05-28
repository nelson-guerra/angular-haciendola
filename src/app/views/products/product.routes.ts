import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MainContentComponent } from '../../layouts/main-content/main-content.component';
import { authGuard } from '../../guards/auth.guard';

export const ProductRoutes: Routes = [
   {
      path: '',
      component: MainContentComponent,
      canActivate: [authGuard],
      children: [
         { path: '', component: ListProductsComponent },
         { path: 'add', component: AddProductComponent },
         { path: 'edit/:id', component: EditProductComponent },
      ],
   },
];
