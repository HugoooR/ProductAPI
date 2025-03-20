import {Component, LOCALE_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        HeaderComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' }
    ]
})
export class AppComponent {
    title = 'market-project';
}
