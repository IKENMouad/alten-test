import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { Product } from 'app/products/data-access/product.model';

export const initialCartState: ReadonlyArray<Product> = [];

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.addProduct, (state, { product }) => {
        const existingProduct = state.find(p => p.id === product.id);
        if (!existingProduct)
            return [...state, product];

        return state;
    }),
    on(CartActions.removeProduct, (state, { id }) =>  {
        return state.filter(p => p.id !== id);
    })
);