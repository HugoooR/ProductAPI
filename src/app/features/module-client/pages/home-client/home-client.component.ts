import {Component} from '@angular/core';
import {ListClientComponent} from '../../component/list-client/list-client.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Client} from '../../../../core/models/Client.models';
import {first} from 'rxjs';
import {ClientService} from '../../services/clients.services';
import {ClientFormModalComponent} from '../../component/client-form-modal/client-form-modal.component';

@Component({
    selector: 'app-home-product',
    imports: [
        ListClientComponent,
        ReactiveFormsModule,
        ClientFormModalComponent
    ],
    templateUrl: './home-client.component.html',
    styleUrl: './home-client.component.scss',
    standalone: true
})
export class HomeClientComponent {

    private _isModalOpen: boolean = false;

    public constructor(
        private _clientService: ClientService
    ) {
    }

    public get isModalOpen(): boolean {
        return this._isModalOpen;
    }

    public openModal(): void {
        this._isModalOpen = true;
    }

    public closeModal(): void {
        this._isModalOpen = false;
    }

    public submitClient($event: Client): void {
        const client: any = {
            id: undefined,
            firstName: $event.firstName,
            lastName: $event.lastName,
            dateOfBirth: $event.dateOfBirth,
            orders: [],
            addresses: $event.addresses ?? []
        };

        this._clientService.createClient(client).pipe(first()).subscribe({
            next: (data: Client) => {
                client.id = data.id;
                this._clientService.addClient(client);
            },
            error: () => {
            },
            complete: () => {
                this._isModalOpen = false;
            }
        });
    }

}
