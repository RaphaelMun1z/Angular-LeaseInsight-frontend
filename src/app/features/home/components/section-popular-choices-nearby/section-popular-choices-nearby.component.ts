import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagedResidenceResponse, Property } from '../../../../shared/interfaces/property';
import { PropertyService } from '../../../../core/services/property.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { PropertyMinimalComponent } from "../../../../shared/components/cards/property-minimal/property-minimal.component";
import { take } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-section-popular-choices-nearby',
    imports: [CommonModule, ButtonModule, RouterModule, TagModule, DividerModule, SkeletonModule, PropertyMinimalComponent],
    templateUrl: './section-popular-choices-nearby.component.html',
    styleUrl: './section-popular-choices-nearby.component.scss',
    providers: [PropertyService]
})

export class SectionPopularChoicesNearbyComponent implements OnInit {
    properties! : Property[];
    
    locations = [
        { name: 'Uberlândia', active: true },
        { name: 'Uberaba', active: false },
        { name: 'Monte Carmelo', active: false },
        { name: 'Santos', active: false },
    ];
    citySelected: string | null = null;
    
    loading: boolean = true;    
    systemDown: boolean = false;
    responsiveOptions: any[] | undefined;
    
    constructor(private service: PropertyService) {}
    
    ngOnInit() {
        this.citySelected = this.locations.find(l => l.active)?.name || null;
        this.getData();
    }
    
    getData() {
        this.loading = true;
        
        const page = 0;
        const size = 6;
        
        const sortValue = "asc";
        const city = this.citySelected;
        const propertyType = "1";
        const maxValue = null;
        
        this.service
        .getPropertiesPaginated(page, size, sortValue, city, maxValue, propertyType)
        .pipe(take(1))
        .subscribe({
            next: (data: PagedResidenceResponse) => {
                if(!data._embedded){
                    this.properties = [];
                    return;
                }
                
                data._embedded.residenceResponseDTOList.forEach(item => {
                    item.fullAddress = `${item.residenceAddress.district}, ${item.residenceAddress.city} - ${item.residenceAddress.state}`;
                });
                
                this.properties = data._embedded.residenceResponseDTOList;
                
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            },
            error: (err) => {
                this.properties = [];
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
                this.systemDown = true;
            },
            complete: () => {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
        });
    }
    
    refresh() {
        this.getData();
    }
    
    selectLocation(selectedLocation: any) {
        this.locations.forEach(location => {
            location.active = (location === selectedLocation);
        });
        
        this.citySelected = selectedLocation.name;
        
        this.getData();
    }
}
