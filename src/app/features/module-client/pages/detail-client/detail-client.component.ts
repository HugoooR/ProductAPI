import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ClientService} from '../../services/clients.services';
import {Client} from '../../../../core/models/Client.models';
import {ClientFormModalComponent} from '../../component/client-form-modal/client-form-modal.component';
import {DatePipe, NgForOf} from '@angular/common';
import {ConfirmModalComponent} from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-detail-client',
    imports: [ClientFormModalComponent, DatePipe, RouterLink, ConfirmModalComponent, NgForOf],
    templateUrl: './detail-client.component.html',
    styleUrl: './detail-client.component.scss',
    standalone: true
})
export class DetailClientComponent implements OnInit {

    public client?: Client;
    public isModalOpen: boolean = false;
    public isModalConfirmOpen: boolean = false;


    public constructor(
        private readonly _clientService: ClientService,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router
    ) {
    }

    public ngOnInit() {
        const idClient: number = this._route.snapshot.params['id'];
        this._loadDetailClient(idClient);
    }

    private _loadDetailClient(idClient: number): void {
        this._clientService.loadClient(idClient).subscribe({
            next: (data: Client) => {
                this.client = data;
            },
            error: (err) => console.error("Erreur de chargement", err)
        });
    }

    public openModal(): void {
        this.isModalOpen = true;
    }

    public closeModal(): void {
        this.isModalOpen = false;
    }

    public updateClient($event: Client): void {
        console.log($event)
        const updatedClient: any = {
            id: $event.id,
            firstName: $event.firstName,
            lastName: $event.lastName,
            dateOfBirth: $event.dateOfBirth,
            addresses: $event.addresses ?? []
        };

        this._clientService.updateClient(updatedClient).subscribe({
            next: () => {
                this.client = updatedClient;
                this.closeModal();
            },
            error: (err) => {
            }
        });
    }

    public openConfirmModal(): void {
        this.isModalConfirmOpen = true;
    }

    public closeConfirmModal(): void {
        this.isModalConfirmOpen = false;
    }

    public deleteClient(): void {
        if (this.client && this.client.id) {
            this._clientService.deleteClient(this.client.id).subscribe();
            this._router.navigate(['/client']).then();
            this.closeConfirmModal();
        }
    }
}
