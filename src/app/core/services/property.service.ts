import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../shared/interfaces/property';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PropertyService {    
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getProperties(): Observable<Property[]> {
        return this.http.get<Property[]>(this.url + "/residences");
    }

    getPropertyById(id: string): Observable<Property> {
        return this.http.get<Property>(this.url + "/residences/" + id);
    }
}
