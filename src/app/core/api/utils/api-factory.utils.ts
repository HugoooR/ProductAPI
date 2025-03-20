import {Collection} from './collection.utils';

export class ApiFactory {
    static createItem<T>(type: any, data: any): T {
        return new type(data);
    }

    static createCollection<T>(type: any, data: any): Collection<T> {
        return new Collection(type, data);
    }
}
