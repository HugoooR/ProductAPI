import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        RouterLink
    ],
    standalone: true
})
export class HeaderComponent {
  title = 'market-project';
}
