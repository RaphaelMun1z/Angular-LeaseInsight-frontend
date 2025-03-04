import { inject, Injectable } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { Owner } from '../../shared/interfaces/owner';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class OwnerStateService {
    private owners$ = new BehaviorSubject<Owner[]>([]);
    private currentOwnerProperties$ = new BehaviorSubject<Property[]>([]);
    
    private ownerService = inject(OwnerService);
    
    // Get All
    loadOwners(){
        this.ownerService
        .getOwners()
        .pipe(take(1))
        .subscribe(owners => this.shareOwners(owners))
    }
    
    private shareOwners(owners: Owner[]){
        this.owners$.next(owners);
    }

    listenToOwnersChanges(): Observable<Owner[]>{
        return this.owners$.asObservable();
    }
    
    // Get By Id
    loadOwner(id: string): Observable<Owner | null> {
        return this.ownerService.getOwnerById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    // Add Owner
    addOwner(Owner: Owner){
        const currentOwners = this.owners$.value;
        this.owners$.next([...currentOwners, Owner]);
    }
    
    // Get Current Owner Properties
    loadCurrentOwnerProperties(){
        this.ownerService
        .getCurrentOwnerProperties()
        .pipe(take(1))
        .subscribe(currentOwnerProperties => this.shareOwnerProperties(currentOwnerProperties))
    }
    
    private shareOwnerProperties(currentOwnerProperties: Property[]){
        this.currentOwnerProperties$.next(currentOwnerProperties);
    }
    
    listenToCurrentOwnerProperties(): Observable<Property[]>{
        return this.currentOwnerProperties$.asObservable();
    }
}
