import { inject, Injectable } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Property, PropertyMinimal } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyStateService {
    private properties$ = new BehaviorSubject<Property[]>([]);
    private propertiesMinimal$ = new BehaviorSubject<PropertyMinimal[]>([]);
    private property$ = new BehaviorSubject<Property | null>(null);
    
    private propertyService = inject(PropertyService);
    
    loadProperties(){
        this.propertyService
        .getProperties()
        .pipe(take(1))
        .subscribe(properties => this.shareProperties(properties))
    }
    
    private shareProperties(properties: Property[]){
        this.properties$.next(properties);
    }
    
    loadProperty(id: string | null){
        if(id != null){
            this.propertyService
            .getPropertyById(id)
            .pipe(take(1))
            .subscribe(property => this.shareProperty(property))
        }
    }
    
    private shareProperty(property: Property){
        this.property$.next(property);
    }
    
    loadPropertiesMinimal(status: string){
        this.propertyService
        .getPropertiesMinimal(status)
        .pipe(take(1))
        .subscribe(properties => this.sharePropertiesMinimal(properties))
    }
    
    private sharePropertiesMinimal(properties: PropertyMinimal[]){
        this.propertiesMinimal$.next(properties);
    }
    
    listenToChanges(): Observable<Property[]>{
        return this.properties$.asObservable();
    }
    
    listenToProperty(): Observable<Property | null>{
        return this.property$.asObservable();
    }
    
    addProperty(Property: Property){
        const currentPropertys = this.properties$.value;
        this.properties$.next([...currentPropertys, Property]);
    }
}
