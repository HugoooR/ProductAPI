import {Injectable} from '@angular/core';
import {Client} from '../../../core/models/Client.models';
import {ClientApi} from '../../../core/http/client.http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export abstract class ClientService {
    private _clients: Client[] = [];

    protected constructor(
        private readonly _clientApi: ClientApi
    ) {
    }

    public get clients(): Client[] {
        return this._clients;
    }

    public addClient(client: Client): void {
        this._clients.push(client);
    }

    public loadClients(): void {
        this._clientApi.getClients().subscribe({
            next: (data) => {
                this._clients = data.member as Client[];
            },
            error: (err) => { }
        });
    }

    public loadClient(idClient: number): Observable<Client> {
        return this._clientApi.getClient(idClient);
    }

    public createClient(clientDto: Client): Observable<Client> {
        return this._clientApi.createClient(clientDto);
    }

    public updateClient(clientDto: Client): Observable<Client> {
        return this._clientApi.updateClient(clientDto);
    }

    public deleteClient(idClient: number): Observable<unknown> {
        return this._clientApi.deleteClient(idClient);
    }
}
