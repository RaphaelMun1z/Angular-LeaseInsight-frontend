import { Component } from '@angular/core';

import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-property',
    imports: [FloatLabelModule, InputTextModule, FormsModule, InputMaskModule, IftaLabelModule, ButtonModule],
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss'
})

export class PropertyComponent {
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    message: string | undefined;
}
