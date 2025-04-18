import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AddFeature, PagedResidenceResponse, Property, PropertyCreate, PropertyMinimal, PropertyUpdate } from '../../shared/interfaces/property';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PropertyService {    
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getProperties(): Observable<Property[]> {
        return this.http.get<Property[]>(this.url + "/residences");
    }
    
    getPropertiesPaginated(page: number, size: number, sortRentalValue: string | null, city: string | null, rentalValue: number | null, propertyType: string | null): Observable<PagedResidenceResponse> {
        let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())

        if (sortRentalValue) {
            params = params.set('sort', `rentalValue,${sortRentalValue}`);
        }
        
        if (city) {
            params = params.set('city', city);
        }
        
        if (rentalValue !== null && rentalValue !== undefined) {
            params = params.set('rentalValue', rentalValue.toString());
        }
        
        if(propertyType !== null && propertyType !== undefined){
            params = params.set('propertyType', propertyType.toString());
        }
        
        return this.http.get<PagedResidenceResponse>(`${this.url}/residences/dynamic-search`, { params });
    }
    
    
    getPropertiesMinimal(status: string): Observable<PropertyMinimal[]> {
        return this.http.get<PropertyMinimal[]>(this.url + "/residences/occupancy-status/" + status);
    }
    
    getPropertyById(id: string): Observable<Property> { 
        return this.http.get<Property>(this.url + "/residences/" + id);
    }
    
    patchProperty(property: PropertyUpdate, id: string): any {
        return this.http.patch<PropertyUpdate>(this.url + "/residences/" + id, property);
    }
    
    saveProperty(property: FormData): any {
        return this.http.post<PropertyCreate>(this.url + "/residences", property);
    }
    
    getPropertyImageByImageName(fileName: string): Observable<Blob> {
        return this.http.get<Blob>(`${this.url}/file/downloadFile/${fileName}`, { responseType: 'blob' as 'json' });
    }
    
    saveFeatureProperty(propertyFeature: any): any {
        return this.http.post<AddFeature>(this.url + "/residences/add-feature", propertyFeature);
    }
}
