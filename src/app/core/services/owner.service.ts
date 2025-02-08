import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner, OwnerCreate } from '../../shared/interfaces/owner';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class OwnerService { 
    private url = environment.api;
    
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
}
