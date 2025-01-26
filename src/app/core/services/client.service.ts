import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, ClientCreate } from '../../shared/interfaces/client';
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

    saveClient(client: ClientCreate): any {
        return this.http.post<ClientCreate>(this.url + "/tenants", client);
    }

}
