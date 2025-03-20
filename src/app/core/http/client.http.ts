import {map, Observable} from 'rxjs';
import {ApiFactory} from '../api/utils/api-factory.utils';
import {ApiService} from '../services/api.services';
import {Injectable} from '@angular/core';
import {Collection} from '../api/utils/collection.utils';
import {Client} from '../models/Client.models';

@Injectable({
    providedIn: 'root',
})
export class ClientApi extends ApiService {
    public constructor() {
        super('client/')
    }

    public getClients(): Observable<Collection<Client>> {
        let u: Observable<Collection<Client>> = this.get('').pipe(
            map((data: any) => ApiFactory.createCollection(Client, data))
        );
        return u as unknown as Observable<Collection<Client>>;
    }

    public getClient(idClient: number): Observable<Client> {
        let u: Observable<Client> = this.get(`/${idClient}`).pipe(
            map((data: any) => ApiFactory.createItem(Client, data))
        );
        return u as unknown as Observable<Client>;
    }

    public createClient(clientDto: Client): Observable<Client> {
        let u: Observable<Client> = this.post('/', clientDto).pipe(
            map((response: any) => ApiFactory.createItem(Client, response))
        )
        return u as unknown as Observable<Client>
    }

    public updateClient(clientDto: Client): Observable<Client> {
        let u: Observable<Client> = this.patch(`/${clientDto.id}`, clientDto).pipe(
            map((response: any) => ApiFactory.createItem(Client, response))
        );
        return u as unknown as Observable<Client>;
    }

    public deleteClient(idClient: number): Observable<unknown> {
        let u: Observable<unknown> = this.delete(`/${idClient}`).pipe();
        return u as Observable<unknown>;
    }
}
