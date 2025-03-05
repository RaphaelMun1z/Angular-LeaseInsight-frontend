import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AddFeature, Property, PropertyCreate, PropertyMinimal, PropertyUpdate } from '../../shared/interfaces/property';
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
