import {Component} from '@angular/core';
import {first} from 'rxjs';
import {OrderService} from '../../services/orders.services';
import {Order} from '../../../../core/models/Order.models';
import {ListProductComponent} from '../../../module-product/component/list-product/list-product.component';
import {
    ProductFormModalComponent
} from '../../../module-product/component/product-form-modal/product-form-modal.component';
import {OrderFormModalComponent} from '../../components/order-form-modal/order-form-modal.component';
import {ListOrderComponent} from '../../components/list-order/list-order.component';


@Component({
    selector: 'app-home-order',
    imports: [
        OrderFormModalComponent,
        ListOrderComponent
    ],
    templateUrl: './home-order.component.html',
    styleUrl: './home-order.component.scss',
    standalone: true
})
export class HomeOrderComponent {

    private _isModalCreateOpen: boolean = false;

    public constructor(
        private readonly _orderService: OrderService
    ) {
    }

    public get isModalCreateOpen(): boolean {
        return this._isModalCreateOpen;
    }

    public openModal(): void {
        this._isModalCreateOpen = true;
    }

    public closeModal(): void {
        this._isModalCreateOpen = false;
    }

    public submitOrder($event: Order): void {
        const order: any = {
            date: $event.date,
            clientId: $event.clientId,
            orderProducts: $event.orderProducts ?? []
        };

        this._orderService.createOrder(order).pipe(first()).subscribe({
            next: (data: Order) => {
                order.id = data.id;
                this._orderService.addOrder(order);
            },
            error: () => {
            },
            complete: () => {
                this._orderService.loadOrders();
                this.closeModal();
            }
        });
    }
}
