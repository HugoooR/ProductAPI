import {Component} from '@angular/core';
import {ClientFormModalComponent} from '../../../module-client/component/client-form-modal/client-form-modal.component';
import {ListClientComponent} from '../../../module-client/component/list-client/list-client.component';
import {Product} from '../../../../core/models/Product.models';
import {ProductFormModalComponent} from '../../component/product-form-modal/product-form-modal.component';
import {ProductService} from '../../services/products.services';
import {first} from 'rxjs';
import {ListProductComponent} from '../../component/list-product/list-product.component';

@Component({
    selector: 'app-home-product',
    imports: [
        ProductFormModalComponent,
        ListProductComponent
    ],
    templateUrl: './home-product.component.html',
    styleUrl: './home-product.component.scss',
    standalone: true
})
export class HomeProductComponent {

    private _isModalCreateOpen: boolean = false;

    public constructor(
        private readonly _productService: ProductService
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

    public submitProduct($event: Product): void {
        const product: any = {
            name: $event.name,
            description: $event.description,
            price: $event.price,
            unitInStock: $event.unitInStock,
            weight: $event.weight,
            orderProducts: []
        };

        this._productService.createProduct(product).pipe(first()).subscribe({
            next: (data: Product) => {
                product.id = data.id;
                this._productService.addProduct(product);
            },
            error: () => {
            },
            complete: () => {
                this.closeModal();
            }
        });
    }
}
