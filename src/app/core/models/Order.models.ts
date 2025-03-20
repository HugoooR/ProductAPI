import {OrderProduct} from './OrderProduct.models';

export class Order {
    private _id?: number;
    private _date!: Date;
    private _clientId!: number;
    private _orderProducts!: OrderProduct[];

    constructor(data: any) {
        this._id = data.orderId;
        this._date = data.date;
        this._clientId = data.clientId;
        this._orderProducts = data.orderProducts;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get date(): Date {
        return this._date;
    }

    public set date(value: Date) {
        this._date = value;
    }

    public get clientId(): number {
        return this._clientId;
    }

    public set clientId(value: number) {
        this._clientId = value;
    }

    public get orderProducts(): OrderProduct[] {
        return this._orderProducts;
    }

    public set orderProducts(value: OrderProduct[]) {
        this._orderProducts = value;
    }

    public get totalPrice(): number {
        return this._orderProducts.reduce((total: number, op: any) => {
            return total + (op.product.price * op.quantity);
        }, 0);
    }

    public get totalWeight(): number {
        return this._orderProducts.reduce((total: number, op: any) => {
            return total + (op.product.weight * op.quantity);
        }, 0);
    }

    public get numberOfArticles(): number {
        return this._orderProducts.length;
    }
}
