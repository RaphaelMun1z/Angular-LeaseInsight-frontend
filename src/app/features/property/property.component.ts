import { Component, inject, OnInit } from '@angular/core';

import { HeroImagesSectionComponent } from "./components/hero-images-section/hero-images-section.component";
import { DetailsSectionComponent } from "./components/details-section/details-section.component";
import { RecommendedComponent } from "./components/recommended/recommended.component";
import { PropertyService } from '../../core/services/property.service';
import { Property } from '../../shared/interfaces/property';
import { map, Observable } from 'rxjs';
import { PropertyStateService } from '../../core/states/property-state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-property',
    imports: [HeroImagesSectionComponent, DetailsSectionComponent, RecommendedComponent],
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss'
})

export class PropertyComponent implements OnInit {
    protected property$ = new Observable<Property | null>();
    property! : Property;
    
    private propertyStateService = inject(PropertyStateService);
    constructor(private route: ActivatedRoute, private service: PropertyService) {}
    
    ngOnInit(): void {
        this.route.paramMap.subscribe(
            value => {
                this.propertyStateService.loadProperty(value.get("id"));
                this.getProperty();
                this.property$.subscribe((data: Property | null) => {
                    if(data){
                        this.property = data;
                        const propertyFeatures = data.features?.map(item => item['feature']);
                        this.property.features = propertyFeatures;
                    }
                });
            }
        )
    }
    
    getProperty(){
        this.property$ = this.propertyStateService.listenToProperty();
    }
}
