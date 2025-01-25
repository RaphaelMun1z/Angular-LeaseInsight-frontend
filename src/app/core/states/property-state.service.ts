import { inject, Injectable } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyStateService {
    private Propertys$ = new BehaviorSubject<Property[]>([]);
    private PropertyService = inject(PropertyService);
    
    constructor() { }
    
    loadProperties(){
        this.PropertyService
        .getProperties()
        .pipe(take(1))
        .subscribe(Propertys => this.shareProperties(Propertys))
    }
    
    private shareProperties(Propertys: Property[]){
        this.Propertys$.next(Propertys);
    }
    
    listenToChanges(): Observable<Property[]>{
        return this.Propertys$.asObservable();
    }
    
    addProperty(Property: Property){
        const currentPropertys = this.Propertys$.value;
        this.Propertys$.next([...currentPropertys, Property]);
    }
}
