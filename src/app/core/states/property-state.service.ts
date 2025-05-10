import { inject, Injectable } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { Property, PropertyMinimal } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyStateService {
    private properties$ = new BehaviorSubject<Property[]>([]);
    private propertiesMinimal$ = new BehaviorSubject<PropertyMinimal[]>([]);
    
    private propertyService = inject(PropertyService);
    
    // Get All
    loadProperties(){
        this.propertyService
        .getProperties()
        .pipe(take(1))
        .subscribe(properties => this.shareProperties(properties))
    }
    
    private shareProperties(properties: Property[]){
        this.properties$.next(properties);
    }
    
    listenToPropertiesChanges(): Observable<Property[]>{
        return this.properties$.asObservable();
    }
    
    // Get All (Minimal)
    loadPropertiesMinimal(status: string){
        this.propertyService
        .getPropertiesMinimal(status)
        .pipe(take(1))
        .subscribe(properties => this.sharePropertiesMinimal(properties))
    }
    
    private sharePropertiesMinimal(properties: PropertyMinimal[]){
        this.propertiesMinimal$.next(properties);
    }
    
    // Get By Id
    loadProperty(id: string): Observable<Property | null> {
        return this.propertyService.getPropertyById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Property
    addProperty(Property: Property){
        const currentPropertys = this.properties$.value;
        this.properties$.next([...currentPropertys, Property]);
    }
    
    // Remove Property
    removeProperty(id: string) {
        const currentProperties = this.properties$.value;
        const updatedProperties = currentProperties.filter(p => p.id !== id);
        this.properties$.next(updatedProperties);
    }
}
