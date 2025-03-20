import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    imports: [],
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

    @Input() public isOpen: boolean = false;
    @Input() public title: string = 'Confirmation';
    @Input() public message: string = "Êtes-vous sûr de vouloir continuer ?";

    @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    public closeModal(): void {
        this.cancel.emit();
    }

    public confirmAction(): void {
        this.confirm.emit();
    }
}
