import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../../../shared/interfaces/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-section-popular-choices-nearby',
    imports: [CommonModule, ButtonModule, TagModule, DividerModule],
    templateUrl: './section-popular-choices-nearby.component.html',
    styleUrl: './section-popular-choices-nearby.component.scss',
    providers: [PropertyService]
})

export class SectionPopularChoicesNearbyComponent implements OnInit {
    properties!: Property[];
    
    responsiveOptions: any[] | undefined;
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.service.getPopular().subscribe((response) => {
            if (response) {
                this.properties = response;
            }
        });
        
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 5,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 2,
                numScroll: 1
            }
        ]
    }
}
