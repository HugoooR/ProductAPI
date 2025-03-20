import {Address} from './Address.models';

export class Client {
    private _id: number | undefined;
    private _firstName: string | undefined;
    private _lastName: string | undefined;
    private _dateOfBirthday: Date | undefined;
    private _orders: any[] = [];
    private _addresses: Address[] = [];

    constructor(data: any) {
        this._id = data.clientId;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._dateOfBirthday = data.dateOfBirth !== undefined ? new Date(data.dateOfBirth) : undefined;
        this._addresses = data.addresses !== undefined && Array.isArray(data.addresses)
            ? data.addresses.map((address: Address) => {
                return new Address(address);
            }) : [];
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get firstName(): string | undefined {
        return this._firstName
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string | undefined {
        return this._lastName;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public get dateOfBirth(): Date | undefined {
        return this._dateOfBirthday;
    }

    public set dateOfBirth(value: Date) {
        this._dateOfBirthday = value;
    }

    public get orders(): any[] {
        return this._orders;
    }

    public set orders(values: any[]) {
        this._orders = values;
    }

    public get addresses(): any[] {
        return this._addresses;
    }

    public set addresses(values: any[]) {
        this._addresses = values;
    }
}
