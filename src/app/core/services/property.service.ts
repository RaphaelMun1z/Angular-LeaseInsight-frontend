import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Property } from '../../shared/interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyService {
    private dataUrl = 'assets/db/properties.json';
    
    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Property[]> {
        return this.http.get<Property[]>(this.dataUrl);
    }
    
    getPopular(): Observable<Property[]> {
        return this.http.get<Property[]>(this.dataUrl).pipe(
            map(properties => properties.slice(0, 6))
        );
    }
    
}
