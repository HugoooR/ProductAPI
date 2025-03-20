export class Product {
    private _productId!: number;
    private _name!: string;
    private _description?: string;
    private _price!: number;
    private _unitInStock!: number;
    private _weight?: number;

    constructor(data: any) {
        this._productId = data.productId;
        this._name = data.name;
        this._price = data.price;
        this._unitInStock = data.unitInStock;
        this._description = data.description;
        this._weight = data.weight;
    }

    public get id(): number {
        return this._productId;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get description(): string | undefined {
        return this._description;
    }

    public set description(value: string | undefined) {
        this._description = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get unitInStock(): number {
        return this._unitInStock;
    }

    public set unitInStock(value: number) {
        this._unitInStock = value;
    }

    public get weight(): number | undefined {
        return this._weight;
    }

    public set weight(value: number | undefined) {
        this._weight = value;
    }
}
