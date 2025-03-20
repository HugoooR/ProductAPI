import {Order} from '../models/Order.models';
import {map, Observable} from 'rxjs';
import {ApiFactory} from '../api/utils/api-factory.utils';
import {ApiService} from '../services/api.services';
import {Injectable} from '@angular/core';
import {Collection} from '../api/utils/collection.utils';

@Injectable({
    providedIn: 'root',
})
export class OrderApi extends ApiService {
    public constructor() {
        super('order')
    }

    public getOrders(): Observable<Collection<Order>> {
        let u: Observable<Collection<Order>> = this.get('').pipe(
            map((data: any) => ApiFactory.createCollection(Order, data))
        );
        return u as unknown as Observable<Collection<Order>>;
    }

    public getOrder(idOrder: number): Observable<Order> {
        let u: Observable<Order> = this.get(`/${idOrder}`).pipe(
            map((data: any) => ApiFactory.createItem(Order, data))
        );
        return u as unknown as Observable<Order>;
    }

    public createOrder(OrderDto: Order): Observable<Order> {
        let u: Observable<Order> = this.post('/', OrderDto).pipe(
            map((response: any) => ApiFactory.createItem(Order, response))
        )
        return u as unknown as Observable<Order>
    }

    public updateOrder(OrderDto: Order): Observable<Order> {
        let u: Observable<Order> = this.patch(`/${OrderDto.id}`, OrderDto).pipe(
            map((response: any) => ApiFactory.createItem(Order, response))
        );
        return u as unknown as Observable<Order>;
    }

    public deleteOrder(idOrder: number): Observable<unknown> {
        let u: Observable<unknown> = this.delete(`/${idOrder}`).pipe();
        return u as Observable<unknown>;
    }
}
