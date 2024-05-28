import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../services/models/product.interface';
import { FormValidators } from '../validators/formValidators';
import { NotificationService } from '../../../services/common/notification.service';

@Component({
   selector: 'app-product-form',
   standalone: true,
   imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
   templateUrl: './product-form.component.html',
   styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
   private readonly _productApiService = inject(ProductsService);
   private readonly _notificationService = inject(NotificationService);
   private readonly _router = inject(Router);

   @Input() idProduct: string | null;

   isEdit: boolean = false;

   productForm = new FormGroup({
      handle: new FormControl('', { validators: Validators.required, nonNullable: true }),
      title: new FormControl('', { validators: Validators.required, nonNullable: true }),
      description: new FormControl('', { validators: Validators.required, nonNullable: true }),
      sku: new FormControl<number | null>(null, [Validators.required, FormValidators.integer]),
      grams: new FormControl<number | null>(null, [Validators.required, FormValidators.decimal]),
      stock: new FormControl<number | null>(null, [Validators.required, FormValidators.integer]),
      price: new FormControl<number | null>(null, [Validators.required, FormValidators.decimal]),
      compare_price: new FormControl<number | null>(null, [Validators.required, FormValidators.decimal]),
      barcode: new FormControl<number | null>(null, [Validators.required, FormValidators.integer]),
   });

   get handleField(): FormControl<string> {
      return this.productForm.controls.handle;
   }

   get titleField(): FormControl<string> {
      return this.productForm.controls.title;
   }

   get descriptionField(): FormControl<string> {
      return this.productForm.controls.description;
   }

   get skuField(): FormControl<number | null> {
      return this.productForm.controls.sku;
   }

   get gramsField(): FormControl<number | null> {
      return this.productForm.controls.grams;
   }

   get stockField(): FormControl<number | null> {
      return this.productForm.controls.stock;
   }

   get priceField(): FormControl<number | null> {
      return this.productForm.controls.price;
   }

   get comparePriceField(): FormControl<number | null> {
      return this.productForm.controls.compare_price;
   }

   get barcodeField(): FormControl<number | null> {
      return this.productForm.controls.barcode;
   }

   ngOnInit(): void {
      if (this.idProduct) {
         this.isEdit = true;
         this._productApiService.getProduct(this.idProduct).subscribe(data => {
            const { handle, title, description, sku, grams, stock, price, compare_price, barcode } = data;
            this.productForm.setValue({
               handle,
               title,
               description,
               sku,
               grams,
               stock,
               price,
               compare_price,
               barcode,
            });
         });
      } else {
         this.isEdit = false;
      }
   }

   sendFormData(): void {
      if (this.productForm.valid) {
         const { handle, title, description, sku, grams, stock, price, compare_price, barcode } =
            this.productForm.getRawValue();
         const data: Product = {
            handle,
            title,
            description,
            sku: Number(sku),
            grams: Number(grams),
            stock: Number(stock),
            price: Number(price),
            compare_price: Number(compare_price),
            barcode: Number(barcode),
         };

         if (this.idProduct) {
            this._productApiService.updateProduct(data, this.idProduct).subscribe((message: string) => {
               this._notificationService.showSuccess(message);
            });
         } else {
            this._productApiService.addProduct(data).subscribe((message: string) => {
               this._notificationService.showSuccess(message);
               this.productForm.reset();
            });
         }
      }
   }

   cancel(): void {
      this._router.navigate(['/products']);
   }
}
