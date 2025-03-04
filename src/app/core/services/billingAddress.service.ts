import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BillingAddress, BillingAddressCreate, BillingAddressUpdate } from '../../shared/interfaces/billingAddress';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class BillingAddressService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getBillingAddresses(): Observable<BillingAddress[]> {
        return this.http.get<BillingAddress[]>(this.url + "/billing-addresses");
    }
    
    getBillingAddressById(id: string): Observable<BillingAddress> {
        return this.http.get<BillingAddress>(this.url + "/billing-addresses/" + id);
    }
    
    saveBillingAddress(billingAddress: BillingAddressCreate): any {
        return this.http.post<BillingAddressCreate>(this.url + "/billing-addresses", billingAddress);
    }
    
    patchBillingAddress(billingAddress: BillingAddressUpdate, id: string): any {
        return this.http.patch<BillingAddressUpdate>(this.url + "/billing-addresses/" + id, billingAddress);
    }
}
