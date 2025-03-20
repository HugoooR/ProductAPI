import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {OrderService} from '../../services/orders.services';
import {Order} from '../../../../core/models/Order.models';

@Component({
    selector: 'app-list-order',
    imports: [
        NgForOf,
        RouterLink
    ],
    templateUrl: './list-order.component.html',
    styleUrl: './list-order.component.scss',
    standalone: true
})
export class ListOrderComponent implements OnInit {

    constructor(
        private _orderService: OrderService
    ) {
    }

    public ngOnInit() {
        this._loadOrders();
    }

    private _loadOrders(): void {
        this._orderService.loadOrders();
    }

    public get orders(): Order[] {
        return this._orderService.orders;
    }

}
