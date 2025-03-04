import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../../../shared/interfaces/property';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-details-section',
    imports: [CommonModule, ButtonModule, SkeletonModule, InputMaskModule, IftaLabelModule, AvatarModule, FormsModule, InputTextModule],
    templateUrl: './details-section.component.html',
    styleUrl: './details-section.component.scss'
})

export class DetailsSectionComponent {
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    message: string | undefined;
    @Input() property! : Property;
}