import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
    providedIn: 'root'
})

export class PropertyService {
    private dataUrl = 'assets/db/properties.json';
    
    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Property[]> {
        return this.http.get<Property[]>(this.dataUrl);
    }
}
