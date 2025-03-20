import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../core/models/Order.models';
import {OrderApi} from '../../../core/http/order.http';

@Injectable({
    providedIn: 'root',
})
export abstract class OrderService {
    private _orders: Order[] = [];

    protected constructor(
        private readonly _orderApi: OrderApi
    ) {
    }

    public get orders(): Order[] {
        return this._orders;
    }

    public addOrder(order: Order): void {
        this._orders.push(order);
    }

    public loadOrders(): void {
        this._orderApi.getOrders().subscribe({
            next: (data) => {
                this._orders = data.member as Order[];
            },
            error: (err) => { }
        });
    }

    public loadOrder(idOrder: number): Observable<Order> {
        return this._orderApi.getOrder(idOrder);
    }

    public createOrder(orderDto: Order): Observable<Order> {
        return this._orderApi.createOrder(orderDto);
    }

    public updateOrder(orderDto: Order): Observable<Order> {
        return this._orderApi.updateOrder(orderDto);
    }

    public deleteOrder(idOrder: number): Observable<unknown> {
        return this._orderApi.deleteOrder(idOrder);
    }
}
