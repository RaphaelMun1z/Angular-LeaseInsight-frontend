import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PropertyMinimalComponent } from '../cards/property-minimal/property-minimal.component';
import { Property, PropertyMinimal } from '../../interfaces/property';
import { CarouselModule } from 'primeng/carousel';

import { PropertyService } from '../../../core/services/property.service';

@Component({
    selector: 'app-section-emphasis',
    imports: [CommonModule, CarouselModule, PropertyMinimalComponent, RouterModule],
    templateUrl: './section-emphasis.component.html',
    styleUrl: './section-emphasis.component.scss',
    providers: [PropertyService]
})

export class SectionEmphasisComponent implements OnInit {
    propertiesMinimal!: PropertyMinimal[];
    
    responsiveOptions = [
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
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.service.getPropertiesMinimal("vacant").subscribe((data: PropertyMinimal[]) => {
            data.forEach(item => {
                item.fullAddress = `${item.residenceAddress.district}, ${item.residenceAddress.city} - ${item.residenceAddress.state}`;
            });
            this.propertiesMinimal = data;
        });
    }
}

