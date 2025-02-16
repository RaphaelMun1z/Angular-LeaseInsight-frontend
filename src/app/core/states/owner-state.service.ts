import { inject, Injectable } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Owner } from '../../shared/interfaces/owner';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class OwnerStateService {
    private owners$ = new BehaviorSubject<Owner[]>([]);
    private owner$ = new BehaviorSubject<Owner | null>(null);
    private currentOwnerProperties$ = new BehaviorSubject<Property[]>([]);
    
    private ownerService = inject(OwnerService);
    constructor() { }
    
    loadOwners(){
        this.ownerService
        .getOwners()
        .pipe(take(1))
        .subscribe(owners => this.shareOwners(owners))
    }
    
    private shareOwners(owners: Owner[]){
        this.owners$.next(owners);
    }
    
    loadOwner(id: string){
        this.ownerService
        .getOwnerById(id)
        .pipe(take(1))
        .subscribe(owner => this.shareOwner(owner))
    }
    
    private shareOwner(owner: Owner){
        this.owner$.next(owner);
    }
    
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
    
    listenToClient(): Observable<Owner | null>{
        return this.owner$.asObservable();
    }
    
    listenToChanges(): Observable<Owner[]>{
        return this.owners$.asObservable();
    }
    
    addOwner(Owner: Owner){
        const currentOwners = this.owners$.value;
        this.owners$.next([...currentOwners, Owner]);
    }
}
