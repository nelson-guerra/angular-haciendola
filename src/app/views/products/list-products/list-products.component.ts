import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../services/models/product.interface';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/common/notification.service';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Component({
   selector: 'app-list-products',
   standalone: true,
   imports: [RouterLink, MatIconModule, MatTableModule, MatPaginator, MatButtonModule],
   templateUrl: './list-products.component.html',
   styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
   private readonly _productApiService = inject(ProductsService);
   private readonly _notificationService = inject(NotificationService);
   private readonly _router = inject(Router);
   private readonly _dialog = inject(MatDialog);

   @ViewChild(MatPaginator) paginator: any = MatPaginator;

   displayedColumns: string[] = ['id', 'handle', 'title', 'sku', 'grams', 'stock', 'price', 'barcode', 'actions'];
   dataSource = new MatTableDataSource<Product>([]);

   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
   }

   ngOnInit(): void {
      this.getProducts();
   }

   getProducts() {
      this._productApiService.getProducts().subscribe((data: Product[]) => {
         this.dataSource = new MatTableDataSource(data);
         this.dataSource.paginator = this.paginator;
      });
   }

   deleteProduct(id: string, title: string, sku: string) {
      const dialogRef = this._dialog.open(DialogComponent, {
         data: { title, sku },
      });

      dialogRef.afterClosed().subscribe(result => {
         if (result) {
            this._productApiService.deleteProduct(id).subscribe(data => {
               this.getProducts();
               this._notificationService.showSuccess(data);
            });
         }
      });
   }

   editProduct(id: string) {
      this._router.navigate(['/products', 'edit', id]);
   }
}
