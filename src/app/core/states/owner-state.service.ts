import { inject, Injectable } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Owner } from '../../shared/interfaces/owner';

@Injectable({
    providedIn: 'root'
})

export class OwnerStateService {
    private owners$ = new BehaviorSubject<Owner[]>([]);
    
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
    
    listenToChanges(): Observable<Owner[]>{
        return this.owners$.asObservable();
    }
    
    addOwner(Owner: Owner){
        const currentOwners = this.owners$.value;
        this.owners$.next([...currentOwners, Owner]);
    }
}
