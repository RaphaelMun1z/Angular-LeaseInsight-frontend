import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Property } from '../../../../shared/interfaces/property';
import { PropertyStateService } from '../../../../core/states/property-state.service';

import { DashboardBaseComponent } from "../../components/dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../../components/content-block/content-block.component";
import { TablePropertiesComponent } from "../../components/tables/table-properties/table-properties.component";

@Component({
    selector: 'app-properties',
    imports: [ContentBlockComponent, DashboardBaseComponent, TablePropertiesComponent],
    templateUrl: './properties.component.html',
    styleUrl: './properties.component.scss'
})

export class PropertiesComponent implements OnInit {
    protected properties$ = new Observable<Property[]>();
    properties : Property[] = [];
    
    constructor(private propertyStateService: PropertyStateService){
        this.propertyStateService.loadProperties();
    }
    
    ngOnInit(): void {
        this.properties$ = this.propertyStateService.listenToPropertiesChanges();
        this.properties$.subscribe((data: Property[]) => {
            this.properties = data;
        });
    }
}