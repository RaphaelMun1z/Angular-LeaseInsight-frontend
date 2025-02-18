import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../../../shared/interfaces/property';
import { PropertyService } from '../../../../core/services/property.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PropertyMinimalComponent } from "../../../../shared/components/cards/property-minimal/property-minimal.component";

@Component({
    selector: 'app-section-popular-choices-nearby',
    imports: [CommonModule, ButtonModule, TagModule, DividerModule, PropertyMinimalComponent],
    templateUrl: './section-popular-choices-nearby.component.html',
    styleUrl: './section-popular-choices-nearby.component.scss',
    providers: [PropertyService]
})

export class SectionPopularChoicesNearbyComponent implements OnInit {
    properties!: Property[];
    
    responsiveOptions: any[] | undefined;
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.service.getProperties().subscribe((response) => {
            if (response) {
                this.properties = response;
            }
        });
    }
}
