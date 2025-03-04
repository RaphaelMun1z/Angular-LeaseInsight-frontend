import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BillingAddressStateService } from '../../../../../core/states/billing-address-state.service';
import { BillingAddress } from '../../../../../shared/interfaces/billingAddress';

import { ContentBlockComponent } from '../../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../../components/dashboard-base/dashboard-base.component';
import { TableClientsBillingAddressesComponent } from '../../../components/tables/table-clients-billing-addresses/table-clients-billing-addresses.component';

@Component({
    selector: 'app-billing-addresses',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableClientsBillingAddressesComponent],
    templateUrl: './billing-addresses.component.html',
    styleUrl: './billing-addresses.component.scss'
})

export class BillingAddressesComponent implements OnInit {
    protected billingAddresses$ = new Observable<BillingAddress[]>();
    billingAddresses : BillingAddress[] = [];
    
    constructor(private billingAddressStateService: BillingAddressStateService){
        this.billingAddressStateService.loadBillingAddresses();
    }
    
    ngOnInit(): void {
        this.getBillingAddresses();
        this.billingAddresses$.subscribe((data: BillingAddress[]) => {
            this.billingAddresses = data;
        });
    }
    
    getBillingAddresses(){
        this.billingAddresses$ = this.billingAddressStateService.listenToChanges();
    }
}