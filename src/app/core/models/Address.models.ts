export class Address {
    private _addressId!: number;
    private _street!: string;
    private _zipCode!: string;
    private _city!: string;
    private _country!: string;

    constructor(data: any) {
        this._addressId = data.addressId;
        this._street = data.street;
        this._zipCode = data.zipCode;
        this._city = data.city;
        this._country = data.country;
    }

    public get addressId(): number {
        return this._addressId;
    }

    public get street(): string {
        return this._street;
    }

    public set street(value: string) {
        this._street = value;
    }

    public get zipCode(): string {
        return this._zipCode;
    }

    public set zipCode(value: string) {
        this._zipCode = value;
    }

    public get city(): string {
        return this._city;
    }

    public set city(value: string) {
        this._city = value;
    }

    public get country(): string {
        return this._country;
    }

    public set country(value: string) {
        this._country = value;
    }
}
