import { inject, Injectable } from '@angular/core';
import { PropertyAddressService } from '../services/propertyAddress.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { PropertyAddress } from '../../shared/interfaces/propertyAddress';

@Injectable({
    providedIn: 'root'
})

export class PropertyAddressStateService {
    private propertyAddresses$ = new BehaviorSubject<PropertyAddress[]>([]);
    
    private propertyAddressService = inject(PropertyAddressService);
    
    // Get All
    loadPropertyAddresses(){
        this.propertyAddressService
        .getPropertyAddresses()
        .pipe(take(1))
        .subscribe(addresses => this.sharePropertyAddresses(addresses))
    }
    
    private sharePropertyAddresses(addresses: PropertyAddress[]){
        this.propertyAddresses$.next(addresses);
    }
    
    listenToPropertyAddressesChanges(): Observable<PropertyAddress[]>{
        return this.propertyAddresses$.asObservable();
    }
    
    // Get By Id
    loadPropertyAddress(id: string): Observable<PropertyAddress | null> {
        return this.propertyAddressService.getPropertyAddressById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add PropertyAddress
    addPropertyAddress(PropertyAddress: PropertyAddress){
        const currentPropertyAddresss = this.propertyAddresses$.value;
        this.propertyAddresses$.next([...currentPropertyAddresss, PropertyAddress]);
    }
}
