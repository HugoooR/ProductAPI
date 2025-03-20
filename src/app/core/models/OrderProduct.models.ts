import {Order} from './Order.models';
import {Product} from './Product.models';


export class OrderProduct {
    private _orderProductId?: number;
    private _orderId?: number;
    private _productId?: number;
    private _quantity?: number;
    private _product?: Product;

    constructor(data: any) {
        this._orderProductId = data.orderProductId;
        this._quantity = data.quantity;
        this._orderId = data.orderId;
        this._productId = data.productId;
        this._product = data.product ? new Product(data.product) : undefined;
    }

    // Getter uniquement pour OrderProductId (lecture seule)
    public get orderProductId(): number | undefined {
        return this._orderProductId;
    }

    public get orderId(): number | undefined {
        return this._orderId;
    }

    public set orderId(value: number) {
        this._orderId = value;
    }

    public get productId(): number | undefined {
        return this._productId;
    }

    public set productId(value: number) {
        this._productId = value;
    }

    public get quantity(): number | undefined {
        return this._quantity;
    }

    public set quantity(value: number) {
        this._quantity = value;
    }

    public get product(): Product | undefined {
        return this._product;
    }

    public set product(value: Product | undefined) {
        this._product = value;
    }
}
