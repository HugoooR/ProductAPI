import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Order} from '../../../../core/models/Order.models';
import {ClientService} from '../../../module-client/services/clients.services';
import {ProductService} from '../../../module-product/services/products.services';
import {OrderProduct} from '../../../../core/models/OrderProduct.models';

@Component({
    selector: 'app-order-form-modal',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './order-form-modal.component.html',
    styleUrl: './order-form-modal.component.scss'
})
export class OrderFormModalComponent implements OnInit, OnChanges {

    @Input() orderData?: Order;
    @Input() isOpen: boolean = false;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submitOrder: EventEmitter<Order> = new EventEmitter<Order>();

    public orderForm!: FormGroup;

    public constructor(
        protected readonly clientService: ClientService,
        protected readonly productService: ProductService
    ) {}

    ngOnInit(): void {
        this.clientService.loadClients();
        this.productService.loadProducts();
        this._initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && this.isOpen) {
            this._updateForm();
        }
    }

    private _initForm(): void {
        this.orderForm = new FormGroup({
            clientId: new FormControl('', [Validators.required]),
            products: new FormArray([]) // Initialisation du FormArray pour les produits
        });
    }

    private _updateForm(): void {
        if (this.orderData) {
            this.orderForm.patchValue({
                clientId: this.orderData.clientId
            });

            const productArray = this.orderForm.get('products') as FormArray;
            productArray.clear();

            this.orderData.orderProducts.forEach((op: { productId: any; quantity: any; }): void => {
                productArray.push(new FormGroup({
                    productId: new FormControl(op.productId, Validators.required),
                    quantity: new FormControl(op.quantity, [Validators.required, Validators.min(1)])
                }));
            });
        } else {
            this.orderForm.reset();
        }
    }

    public get productControls(): FormArray {
        return this.orderForm.get('products') as FormArray;
    }

    public addProduct(): void {
        const productGroup = new FormGroup({
            productId: new FormControl('', Validators.required),
            quantity: new FormControl(1, [Validators.required, Validators.min(1)])
        });

        this.productControls.push(productGroup);
    }

    public removeProduct(index: number): void {
        this.productControls.removeAt(index);
    }

    public closeModal(): void {
        this.close.emit();
    }

    public submitForm(): void {
        if (this.orderForm.valid) {
            const orderProducts: OrderProduct[] = this.orderForm.value.products.map((p: any) => ({
                orderId: this.orderData?.id || undefined,
                productId: p.productId,
                quantity: p.quantity
            }));

            // Création de l'objet Order avec la date de création actuelle
            const order: any = {
                id: this.orderData?.id,
                date: new Date(), // Date de création de la commande
                clientId: this.orderForm.value.clientId,
                orderProducts
            }

            this.submitOrder.emit(order);
            this.closeModal();
        }
    }
}
