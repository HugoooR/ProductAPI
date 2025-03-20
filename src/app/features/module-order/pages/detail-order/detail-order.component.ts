import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {OrderFormModalComponent} from '../../components/order-form-modal/order-form-modal.component';
import {OrderService} from '../../services/orders.services';
import {Order} from '../../../../core/models/Order.models';

@Component({
    selector: 'app-detail-product',
    imports: [RouterLink, CurrencyPipe, DatePipe, NgForOf, NgClass],
    templateUrl: './detail-order.component.html',
    styleUrl: './detail-order.component.scss',
    standalone: true
})
export class DetailOrderComponent implements OnInit {

    public order?: Order;


    public constructor(
        private readonly _orderService: OrderService,
        private readonly _route: ActivatedRoute,
    ) {
    }

    public ngOnInit() {
        const idOrder: number = this._route.snapshot.params['id'];
        this._loadDetailOrder(idOrder);
    }

    private _loadDetailOrder(idOrder: number): void {
        this._orderService.loadOrder(idOrder).subscribe({
            next: (data: Order) => {
                this.order = data;
            },
            error: (err) => console.error("Erreur de chargement", err)
        });
    }
}
