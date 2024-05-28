import { Component, inject } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
   selector: 'app-add-product',
   standalone: true,
   imports: [ProductFormComponent],
   templateUrl: './add-product.component.html',
   styleUrl: './add-product.component.scss',
})
export class AddProductComponent {}
