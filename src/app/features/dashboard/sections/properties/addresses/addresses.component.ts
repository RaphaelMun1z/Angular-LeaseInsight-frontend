import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PropertyAddressStateService } from '../../../../../core/states/property-address-state.service';
import { PropertyAddress } from '../../../../../shared/interfaces/propertyAddress';

import { ContentBlockComponent } from '../../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../../components/dashboard-base/dashboard-base.component';
import { TablePropertiesAddressesComponent } from '../../../components/views/table-properties-addresses/table-properties-addresses.component';

@Component({
  selector: 'app-addresses',
  imports: [ContentBlockComponent, DashboardBaseComponent, TablePropertiesAddressesComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})

export class AddressesComponent implements OnInit {
    protected propertiesAddresses$ = new Observable<PropertyAddress[]>();
    propertiesAddresses : PropertyAddress[] = [];
    
    constructor(private propertyAddressStateService: PropertyAddressStateService){
        this.propertyAddressStateService.loadPropertyAddresses();
    }
    
    ngOnInit(): void {
        this.getPropertiesAddresses();
        this.propertiesAddresses$.subscribe((data: PropertyAddress[]) => {
            this.propertiesAddresses = data;
        });
    }
    
    getPropertiesAddresses(){
        this.propertiesAddresses$ = this.propertyAddressStateService.listenToChanges();
    }
}