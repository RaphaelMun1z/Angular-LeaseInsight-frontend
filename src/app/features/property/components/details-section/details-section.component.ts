import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../../../shared/interfaces/property';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../../../../shared/components/map/map.component';

@Component({
    selector: 'app-details-section',
    imports: [CommonModule, ButtonModule, SkeletonModule, MapComponent, InputMaskModule, IftaLabelModule, AvatarModule, FormsModule, InputTextModule],
    templateUrl: './details-section.component.html',
    styleUrl: './details-section.component.scss'
})

export class DetailsSectionComponent implements OnChanges {
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    message: string | undefined;
    @Input() property! : Property;
    fullAddress!: string;
    
    ngOnChanges(changes: SimpleChanges): void {
        if(this?.property?.residenceAddress) {
            this.fullAddress = this.property.residenceAddress.street + ', ' + this.property.number + ', ' + this.property.residenceAddress.district + ', ' + this.property.residenceAddress.city + ', ' + this.property.residenceAddress.state + ', ' + this.property.residenceAddress.country;
            //this.fullAddress = "R. Florinda Rosa Teixeira - Vila Galvão"
            console.log(this.fullAddress);
        }
    }
}