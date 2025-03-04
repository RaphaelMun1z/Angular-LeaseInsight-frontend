import { inject, Injectable } from '@angular/core';
import { BillingAddressService } from '../services/billingAddress.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { BillingAddress } from '../../shared/interfaces/billingAddress';

@Injectable({
    providedIn: 'root'
})

export class BillingAddressStateService {
    private billingAddresses$ = new BehaviorSubject<BillingAddress[]>([]);
    private billingAddressService = inject(BillingAddressService);
    
    constructor() { }
    
    // Get All
    loadBillingAddresses(){
        this.billingAddressService
        .getBillingAddresses()
        .pipe(take(1))
        .subscribe(billingAddresss => this.shareBillingAddresses(billingAddresss))
    }
    
    private shareBillingAddresses(billingAddresss: BillingAddress[]){
        this.billingAddresses$.next(billingAddresss);
    }
    
    listenToBillingAddressesChanges(): Observable<BillingAddress[]>{
        return this.billingAddresses$.asObservable();
    }
    
    // Get By Id
    loadBillingAddress(id: string): Observable<BillingAddress | null> {
        return this.billingAddressService.getBillingAddressById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add BillingAddress
    addBillingAddress(billingAddress: BillingAddress){
        const currentBillingAddresss = this.billingAddresses$.value;
        this.billingAddresses$.next([...currentBillingAddresss, billingAddress]);
    }
}
