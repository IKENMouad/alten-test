import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ProductsService {
    private readonly path = "http://localhost:8080/api/v1/products";

    private readonly http = inject(HttpClient);
 
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((_) => this.http.get<Product[]>("assets/products.json")),
            tap((products) => this._products.set(products)),
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(this.getErrorHandler),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(this.getErrorHandler),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(this.getErrorHandler),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }

    getErrorHandler(errorRes: HttpErrorResponse) {
        let errorMessage = errorRes.error?.message;
        return throwError(() => new Error(errorMessage));
    }
}