import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';
import {ProductFormModalComponent} from '../../component/product-form-modal/product-form-modal.component';
import {ProductService} from '../../services/products.services';
import {Product} from '../../../../core/models/Product.models';

@Component({
    selector: 'app-detail-product',
    imports: [RouterLink, ConfirmModalComponent, ProductFormModalComponent, CurrencyPipe, NgIf],
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.scss',
    standalone: true
})
export class DetailProductComponent implements OnInit {

    public product?: Product;
    public isModalOpen: boolean = false;
    public isModalConfirmOpen: boolean = false;


    public constructor(
        private readonly _productService: ProductService,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router
    ) {
    }

    public ngOnInit() {
        const idProduct: number = this._route.snapshot.params['id'];
        this._loadDetailProduct(idProduct);
    }

    private _loadDetailProduct(idProduct: number): void {
        this._productService.loadProduct(idProduct).subscribe({
            next: (data: Product) => {
                this.product = data;
            },
            error: (err) => console.error("Erreur de chargement", err)
        });
    }

    public openModal(): void {
        this.isModalOpen = true;
    }

    public closeModal(): void {
        this.isModalOpen = false;
    }

    public updateProduct(updatedProduct: Product): void {
        this._productService.updateProduct(updatedProduct).subscribe({
            next: () => {
                this.product = updatedProduct;
                this.closeModal();
            },
            error: (err) => {
            }
        });
    }

    public openConfirmModal(): void {
        this.isModalConfirmOpen = true;
    }

    public closeConfirmModal(): void {
        this.isModalConfirmOpen = false;
    }

    public deleteProduct(): void {
        if (this.product && this.product.id) {
            this._productService.deleteProduct(this.product.id).subscribe();
            this._router.navigate(['/product']).then();
            this.closeConfirmModal();
        }
    }
}
