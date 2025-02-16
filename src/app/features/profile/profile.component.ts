import { Component } from '@angular/core';

import { PanelComponent } from './panel/panel.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [PanelComponent, RouterModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent {
    
}