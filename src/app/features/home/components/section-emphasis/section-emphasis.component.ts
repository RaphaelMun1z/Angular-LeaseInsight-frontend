import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../../../../shared/interfaces/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-section-emphasis',
    imports: [CommonModule, CarouselModule, ButtonModule, TagModule, DividerModule],
    templateUrl: './section-emphasis.component.html',
    styleUrl: './section-emphasis.component.scss',
    providers: [PropertyService]
})

export class SectionEmphasisComponent implements OnInit {
    properties!: Property[];
    
    responsiveOptions: any[] | undefined;
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.service.getAll().subscribe((response) => {
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

