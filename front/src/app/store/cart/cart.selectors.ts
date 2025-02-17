import {  createFeatureSelector } from '@ngrx/store';
import { Product } from 'app/products/data-access/product.model';

export const selectCart = createFeatureSelector<ReadonlyArray<Product>>('cart');