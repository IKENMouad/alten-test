import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'app/products/data-access/product.model';
import { CartActions } from 'app/store/cart.actions';
import { selectCart,  } from 'app/store/cart.selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,DataViewModule, CardModule, ButtonModule,AsyncPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  private store = inject(Store)

  products$!: Observable<ReadonlyArray<Product>>;

  ngOnInit(): void {
    this.products$ = this.store.select(selectCart);
  }


  public onRemoveFromCard = (product: Product) =>  {
    this.store.dispatch(CartActions.removeProduct({id:product.id}))
  };


}
