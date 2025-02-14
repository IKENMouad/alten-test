import { Injectable, signal } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor() { }

  private readonly _products = signal<Product[]>([]);

  public readonly products = this._products.asReadonly();

  addProduct(product: Product) {
     return of(this._products.update(products => [product, ...products]));
  }

}
