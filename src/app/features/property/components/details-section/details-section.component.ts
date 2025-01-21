import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-details-section',
    imports: [ButtonModule, InputMaskModule, IftaLabelModule, AvatarModule, FormsModule, InputTextModule],
    templateUrl: './details-section.component.html',
    styleUrl: './details-section.component.scss'
})

export class DetailsSectionComponent {
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    message: string | undefined;
}
