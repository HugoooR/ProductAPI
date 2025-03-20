import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Product} from '../../../../core/models/Product.models';

@Component({
    selector: 'app-product-form-modal',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './product-form-modal.component.html',
    styleUrl: './product-form-modal.component.scss'
})
export class ProductFormModalComponent implements OnInit, OnChanges {

    @Input() productData?: Product;
    @Input() isOpen: boolean = false;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submitProduct: EventEmitter<Product> = new EventEmitter<Product>();

    public productForm!: FormGroup;

    ngOnInit(): void {
        this._initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && this.isOpen) {
            this._updateForm();
        }
    }

    private _initForm(): void {
        this.productForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            unitInStock: new FormControl('', [Validators.required]),
            weight: new FormControl('', [Validators.required]),
        });
    }

    private _updateForm(): void {
        if (this.productData) {
            this.productForm.patchValue({
                name: this.productData.name,
                description: this.productData.description,
                price: this.productData.price,
                unitInStock: this.productData.unitInStock,
                weight: this.productData.weight,
            });
        } else {
            this.productForm.reset();
        }
    }


    public closeModal(): void {
        this.close.emit();
    }

    public submitForm(): void {
        if (this.productForm.valid) {
            const product: Product = {
                id: this.productData?.id || undefined,
                ...this.productForm.value
            };
            this.submitProduct.emit(product);
            this.closeModal();
        }
    }
}
