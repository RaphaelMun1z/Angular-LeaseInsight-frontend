import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PropertyStateService } from '../../../../core/states/property-state.service';
import { Property } from '../../../../shared/interfaces/property';

import { SplitButtonModule } from 'primeng/splitbutton';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButton } from 'primeng/splitbutton';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { PropertyMinimalComponent } from "../../../../shared/components/cards/property-minimal/property-minimal.component";

@Component({
    selector: 'app-section-properties',
    imports: [CommonModule, RouterModule, PaginatorModule, ButtonModule, TagModule, DividerModule, SplitButtonModule, SplitButton, PropertyMinimalComponent],
    templateUrl: './section-properties.component.html',
    styleUrl: './section-properties.component.scss'
})

export class SectionPropertiesComponent implements OnInit {
    protected properties$ = new Observable<Property[]>();
    properties! : Property[];
    first: number = 0;
    rows: number = 10;
    
    constructor(private propertyStateService: PropertyStateService){
        this.propertyStateService.loadProperties();
    }
    
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    
    ngOnInit() {
        this.properties$ = this.propertyStateService.listenToPropertiesChanges();
        this.properties$.subscribe((data: Property[]) => {
            data.forEach(item => {
                item.fullAddress = `${item.residenceAddress.district}, ${item.residenceAddress.city} - ${item.residenceAddress.state}`;
            });
            this.properties = data;
        });
    }
}
