import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-details',
    imports: [InputTextModule, AvatarModule, ButtonModule],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})

export class DetailsComponent {
    
}
