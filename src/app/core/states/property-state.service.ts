import { inject, Injectable } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyStateService {
    private Properties$ = new BehaviorSubject<Property[]>([]);
    private Property$ = new BehaviorSubject<Property | null>(null);

    private PropertyService = inject(PropertyService);
    
    loadProperties(){
        this.PropertyService
        .getProperties()
        .pipe(take(1))
        .subscribe(Propertys => this.shareProperties(Propertys))
    }

    private shareProperties(properties: Property[]){
        this.Properties$.next(properties);
    }

    loadProperty(id: string){
        this.PropertyService
        .getPropertyById(id)
        .pipe(take(1))
        .subscribe(Property => this.shareProperty(Property))
    }
   
    private shareProperty(property: Property){
        this.Property$.next(property);
    }
    
    listenToChanges(): Observable<Property[]>{
        return this.Properties$.asObservable();
    }

    listenToProperty(): Observable<Property | null>{
        return this.Property$.asObservable();
    }
    
    addProperty(Property: Property){
        const currentPropertys = this.Properties$.value;
        this.Properties$.next([...currentPropertys, Property]);
    }
}
