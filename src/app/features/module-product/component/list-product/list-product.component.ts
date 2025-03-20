import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductService} from '../../services/products.services';
import {Product} from '../../../../core/models/Product.models';

@Component({
    selector: 'app-list-product',
    imports: [
        NgForOf,
        RouterLink,
        SlicePipe
    ],
    templateUrl: './list-product.component.html',
    styleUrl: './list-product.component.scss',
    standalone: true
})
export class ListProductComponent implements OnInit {

    constructor(
        private _productService: ProductService
    ) {
    }

    public ngOnInit() {
        this._loadClients();
    }

    private _loadClients(): void {
        this._productService.loadProducts();
    }

    public get products(): Product[] {
        return this._productService.products;
    }

}
