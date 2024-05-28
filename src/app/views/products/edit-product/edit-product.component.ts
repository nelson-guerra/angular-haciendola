import { Component, Input, inject } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
   selector: 'app-edit-product',
   standalone: true,
   imports: [ProductFormComponent],
   templateUrl: './edit-product.component.html',
   styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
   @Input('id') idProduct!: string;
}
