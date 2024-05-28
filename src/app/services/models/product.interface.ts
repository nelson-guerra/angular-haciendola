export interface Product {
   id?: string;
   handle: string;
   title: string;
   description: string;
   sku: number;
   grams: number;
   stock: number;
   price: number;
   compare_price: number;
   barcode: number;
}

export interface ProductHttpResponse {
   status: boolean;
   message: string;
   data: Product[] | Product | {};
}
