import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PropertyMinimalComponent } from '../../../shared/components/cards/property-minimal/property-minimal.component';
import { PropertyMinimal } from '../../../shared/interfaces/property';
import { CarouselModule } from 'primeng/carousel';

import { PropertyService } from '../../services/property.service';

@Component({
    selector: 'app-section-emphasis',
    imports: [CommonModule, CarouselModule, PropertyMinimalComponent, RouterModule],
    templateUrl: './section-emphasis.component.html',
    styleUrl: './section-emphasis.component.scss',
    providers: [PropertyService]
})

export class SectionEmphasisComponent implements OnInit {
    propertiesMinimal!: PropertyMinimal[];
    
    responsiveOptions: any[] | undefined;
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.service.getPropertiesMinimal("vacant").subscribe((response) => {
            if (response) {
                this.propertiesMinimal = response;
            }
        });
        
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }
}

