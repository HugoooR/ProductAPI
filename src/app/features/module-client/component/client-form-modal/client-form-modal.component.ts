import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Client} from '../../../../core/models/Client.models';

@Component({
    selector: 'app-client-form-modal',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './client-form-modal.component.html',
    styleUrl: './client-form-modal.component.scss'
})
export class ClientFormModalComponent implements OnInit, OnChanges {

    @Input() clientData?: Client; // Si fourni, on est en mode modification
    @Input() isOpen: boolean = false; // Contrôle l'affichage de la popup
    @Output() close = new EventEmitter<void>(); // Pour fermer la popup
    @Output() submitClient = new EventEmitter<Client>(); // Pour envoyer les données au parent

    public clientForm!: FormGroup;

    ngOnInit(): void {
        this._initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isOpen'] && this.isOpen) {
            this._updateForm();
        }
    }

    private _initForm(): void {
        this.clientForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            dateOfBirth: new FormControl('', [Validators.required]),
            addresses: new FormArray([])
        });
    }

    private _updateForm(): void {
        if (this.clientData) {
            const date = this.clientData.dateOfBirth
                ? new Date(this.clientData.dateOfBirth)
                : '';
            let formattedDate = '';
            if (date) {
                formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            }

            this.clientForm.patchValue({
                firstName: this.clientData.firstName || '',
                lastName: this.clientData.lastName || '',
                dateOfBirth: formattedDate, // Date au format YYYY-MM-DD sans conversion UTC
            });

            // Gestion des adresses
            const addressArray = this.clientForm.get('addresses') as FormArray;
            addressArray.clear(); // Supprime les anciennes entrées avant de recharger

            this.clientData.addresses.forEach(address => {
                addressArray.push(new FormGroup({
                    street: new FormControl(address.street, Validators.required),
                    zipCode: new FormControl(address.zipCode, Validators.required),
                    city: new FormControl(address.city, Validators.required),
                    country: new FormControl(address.country, Validators.required)
                }));
            });
        } else {
            this.clientForm.reset();
        }
    }


    public closeModal(): void {
        this.close.emit(); // Notifie le parent pour fermer la popup
    }

    public submitForm(): void {
        if (this.clientForm.valid) {
            const client: Client = {
                id: this.clientData?.id || undefined,
                ...this.clientForm.value
            };
            this.submitClient.emit(client); // Envoie les données modifiées
            this.closeModal(); // Ferme la popup après soumission
        }
    }


    public get addressControls(): FormArray {
        return this.clientForm.get('addresses') as FormArray;
    }

    public addAddress(): void {
        this.addressControls.push(new FormGroup({
            street: new FormControl('', Validators.required),
            zipCode: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required)
        }));
    }

    public removeAddress(index: number): void {
        this.addressControls.removeAt(index);
    }
}
