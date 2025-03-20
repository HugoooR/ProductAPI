import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/clients.services';
import {Client} from '../../../../core/models/Client.models';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-list-client',
    imports: [
        NgForOf,
        DatePipe,
        RouterLink
    ],
    templateUrl: './list-client.component.html',
    styleUrl: './list-client.component.scss',
    standalone: true
})
export class ListClientComponent implements OnInit {

    constructor(
        private _clientService: ClientService
    ) {
    }

    public ngOnInit() {
        this._loadClients();
    }

    private _loadClients(): void {
        this._clientService.loadClients();
    }

    public get clients(): Client[] {
        return this._clientService.clients;
    }

}
