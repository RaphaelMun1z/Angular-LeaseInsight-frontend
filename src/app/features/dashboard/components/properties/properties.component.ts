import { Component, OnInit } from '@angular/core';
import { ContentBlockComponent } from "../content-block/content-block.component";
import { DashboardBaseComponent } from "../dashboard-base/dashboard-base.component";
import { TablePropertiesComponent } from "../table-properties/table-properties.component";
import { Observable } from 'rxjs';
import { Property } from '../../../../shared/interfaces/property';
import { PropertyStateService } from '../../../../core/states/property-state.service';

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
        this.getPropertys();
        this.properties$.subscribe((data: Property[]) => {
            this.properties = data;
        });
    }
    
    getPropertys(){
        this.properties$ = this.propertyStateService.listenToChanges();
    }
}