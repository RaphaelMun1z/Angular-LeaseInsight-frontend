import { inject, Injectable } from '@angular/core';
import { BillingAddressService } from '../services/billingAddress.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { BillingAddress } from '../../shared/interfaces/billingAddress';

@Injectable({
    providedIn: 'root'
})

export class BillingAddressStateService {
    private billingAddresses$ = new BehaviorSubject<BillingAddress[]>([]);
    private billingAddressService = inject(BillingAddressService);
    
    constructor() { }
    
    loadBillingAddresses(){
        this.billingAddressService
        .getBillingAddresses()
        .pipe(take(1))
        .subscribe(billingAddresss => this.shareBillingAddresses(billingAddresss))
    }
    
    private shareBillingAddresses(billingAddresss: BillingAddress[]){
        this.billingAddresses$.next(billingAddresss);
    }
    
    listenToChanges(): Observable<BillingAddress[]>{
        return this.billingAddresses$.asObservable();
    }
    
    addBillingAddress(billingAddress: BillingAddress){
        const currentBillingAddresss = this.billingAddresses$.value;
        this.billingAddresses$.next([...currentBillingAddresss, billingAddress]);
    }
}
