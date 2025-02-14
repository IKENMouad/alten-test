import { createActionGroup, props } from '@ngrx/store';
import { Product } from 'app/products/data-access/product.model';

export const CartActions = createActionGroup({
    source: 'Cart',
    events: {
        'Add Product': props<{ product: Product }>(),
        'Remove Product': props<{ id: number }>(),
    },
});