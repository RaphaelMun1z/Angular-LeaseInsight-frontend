import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { AuthUserService } from './authUser.service';
import { Owner, OwnerCreate, OwnerUpdate } from '../../shared/interfaces/owner';
import { Property } from '../../shared/interfaces/property';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class OwnerService { 
    private url = environment.api;
    
    private authUserService = inject(AuthUserService);
    constructor(private http: HttpClient) { }
    
    getOwners(): Observable<Owner[]> {
        return this.http.get<Owner[]>(this.url + "/owners");
    }
    
    getOwnerById(id: string): Observable<Owner> {
        return this.http.get<Owner>(this.url + "/owners/" + id);
    }
    
    saveOwner(address: OwnerCreate): any {
        return this.http.post<Owner>(this.url + "/owners", address);
    }
    
    patchOwner(owner: OwnerUpdate, id: string): any {
        return this.http.patch<OwnerUpdate>(this.url + "/owners/" + id, owner);
    }
    
    getCurrentOwnerProperties(): Observable<Property[]> {
        return this.authUserService.getAuthUser().pipe(
            switchMap(user => {
                return this.http.get<Property[]>(this.url + "/owners/" + user.id + "/residences");
            })
        );
    }

    deleteOwner(id: string): any {
        return this.http.delete<void>(this.url + "/owners/" + id);
    }
}
