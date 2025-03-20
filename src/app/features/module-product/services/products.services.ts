import {Injectable} from '@angular/core';
import {ClientApi} from '../../../core/http/client.http';
import {Observable} from 'rxjs';
import {Product} from '../../../core/models/Product.models';
import {ProductApi} from '../../../core/http/product.http';

@Injectable({
    providedIn: 'root',
})
export abstract class ProductService {
    private _products: Product[] = [];

    protected constructor(
        private readonly _productApi: ProductApi
    ) {
    }

    public get products(): Product[] {
        return this._products;
    }

    public addProduct(product: Product): void {
        this._products.push(product);
    }

    public loadProducts(): void {
        this._productApi.getProducts().subscribe({
            next: (data) => {
                this._products = data.member as Product[];
            },
            error: (err) => { }
        });
    }

    public loadProduct(idProduct: number): Observable<Product> {
        return this._productApi.getProduct(idProduct);
    }

    public createProduct(productDto: Product): Observable<Product> {
        return this._productApi.createProduct(productDto);
    }

    public updateProduct(productDto: Product): Observable<Product> {
        return this._productApi.updateProduct(productDto);
    }

    public deleteProduct(idProduct: number): Observable<unknown> {
        return this._productApi.deleteProduct(idProduct);
    }
}
