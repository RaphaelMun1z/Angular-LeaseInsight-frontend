import { inject, Injectable } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyStateService {
    private properties$ = new BehaviorSubject<Property[]>([]);
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

    loadProperty(id: string){
        this.propertyService
        .getPropertyById(id)
        .pipe(take(1))
        .subscribe(property => this.shareProperty(property))
    }
   
    private shareProperty(property: Property){
        this.property$.next(property);
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
