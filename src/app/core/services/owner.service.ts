import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Owner, OwnerCreate } from '../../shared/interfaces/owner';
import { environment } from '../../../environments/environment';
import { Property } from '../../shared/interfaces/property';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class OwnerService { 
    private url = environment.api;
    
    authService = inject(AuthService);
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
    
    getCurrentOwnerProperties(): Observable<Property[]> {
        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                return this.http.get<Property[]>(this.url + "/owners/" + user.id + "/residences");
            })
        );
    }
}
