import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'app-support-section',
    imports: [InputTextModule, FormsModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './support-section.component.html',
    styleUrl: './support-section.component.scss'
})

export class SupportSectionComponent {
    name: string | undefined;
    email: string | undefined;
    message: string | undefined;
}
