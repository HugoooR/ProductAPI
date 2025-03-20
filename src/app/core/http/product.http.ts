import {Product} from '../models/Product.models';
import {map, Observable} from 'rxjs';
import {ApiFactory} from '../api/utils/api-factory.utils';
import {ApiService} from '../services/api.services';
import {Injectable} from '@angular/core';
import {Collection} from '../api/utils/collection.utils';

@Injectable({
    providedIn: 'root',
})
export class ProductApi extends ApiService {
    public constructor() {
        super('product')
    }

    public getProducts(): Observable<Collection<Product>> {
        let u: Observable<Collection<Product>> = this.get('').pipe(
            map((data: any) => ApiFactory.createCollection(Product, data))
        );
        return u as unknown as Observable<Collection<Product>>;
    }

    public getProduct(idProduct: number): Observable<Product> {
        let u: Observable<Product> = this.get(`/${idProduct}`).pipe(
            map((data: any) => ApiFactory.createItem(Product, data))
        );
        return u as unknown as Observable<Product>;
    }

    public createProduct(productDto: Product): Observable<Product> {
        let u: Observable<Product> = this.post('/', productDto).pipe(
            map((response: any) => ApiFactory.createItem(Product, response))
        )
        return u as unknown as Observable<Product>
    }

    public updateProduct(productDto: Product): Observable<Product> {
        let u: Observable<Product> = this.patch(`/${productDto.id}`, productDto).pipe(
            map((response: any) => ApiFactory.createItem(Product, response))
        );
        return u as unknown as Observable<Product>;
    }

    public deleteProduct(idProduct: number): Observable<unknown> {
        let u: Observable<unknown> = this.delete(`/${idProduct}`).pipe();
        return u as Observable<unknown>;
    }
}
