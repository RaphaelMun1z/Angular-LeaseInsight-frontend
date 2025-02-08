import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PropertyAddress, PropertyAddressCreate } from '../../shared/interfaces/propertyAddress';

@Injectable({
    providedIn: 'root'
})

export class PropertyAddressService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getPropertyAddresses(): Observable<PropertyAddress[]> {
        return this.http.get<PropertyAddress[]>(this.url + "/residence-addresses");
    }
    
    getPropertyAddressById(id: string): Observable<PropertyAddress> {
        return this.http.get<PropertyAddress>(this.url + "/residence-addresses/" + id);
    }

    savePropertyAddress(address: PropertyAddressCreate): any {
        return this.http.post<PropertyAddress>(this.url + "/residence-addresses", address);
    }
}
