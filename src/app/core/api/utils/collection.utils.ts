import {ApiFactory} from './api-factory.utils';

export class Collection<T> {
    private readonly _type: string
    private readonly _member: T[] = []

    public constructor(type: any, data: any) {
        this._type = data['@type']
        data.forEach((item: any) => {
            this._member.push(ApiFactory.createItem<T>(type, item))
        })
    }

    get type(): string {
        return this._type
    }

    get member(): T[] {
        return this._member;
    }
}
