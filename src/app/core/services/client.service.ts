import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import { Client } from '../../shared/interfaces/client';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.url + "/tenants");
    }
}
