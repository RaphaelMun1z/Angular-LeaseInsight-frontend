import { inject, Injectable } from '@angular/core';
import { PropertyAddressService } from '../services/propertyAddress.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { PropertyAddress } from '../../shared/interfaces/propertyAddress';

@Injectable({
    providedIn: 'root'
})

export class PropertyAddressStateService {
    private propertyAddresses$ = new BehaviorSubject<PropertyAddress[]>([]);
    
    private propertyAddressService = inject(PropertyAddressService);
    
    loadPropertyAddresses(){
        this.propertyAddressService
        .getPropertyAddresses()
        .pipe(take(1))
        .subscribe(addresses => this.sharePropertyAddresses(addresses))
    }
    
    private sharePropertyAddresses(addresses: PropertyAddress[]){
        this.propertyAddresses$.next(addresses);
    }

    listenToChanges(): Observable<PropertyAddress[]>{
        return this.propertyAddresses$.asObservable();
    }

    addPropertyAddress(PropertyAddress: PropertyAddress){
        const currentPropertyAddresss = this.propertyAddresses$.value;
        this.propertyAddresses$.next([...currentPropertyAddresss, PropertyAddress]);
    }
}
