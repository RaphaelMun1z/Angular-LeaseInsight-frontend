import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';

import { AuthUserService } from './authUser.service';
import { Client, ClientCreate, ClientUpdate } from '../../shared/interfaces/client';
import { Invoice, InvoiceFull } from '../../shared/interfaces/invoice';
import { Contract } from '../../shared/interfaces/contract';
import { Report } from '../../shared/interfaces/report';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientService { 
    private url = environment.api;
    
    authUserService = inject(AuthUserService);
    constructor(private http: HttpClient) { }
    
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.url + "/tenants");
    }

    getClientById(id: string): Observable<Client> {
        return this.http.get<Client>(this.url + "/tenants/" + id);
    }
    
    saveClient(client: ClientCreate): any {
        return this.http.post<ClientCreate>(this.url + "/tenants", client);
    }
    
    patchClient(client: ClientUpdate, id: string): any {
        return this.http.patch<ClientUpdate>(this.url + "/tenants/" + id, client);
    }
    
    getClientInvoices(id: string): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.url + "/tenants/" + id + "/invoices");
    }
    
    getCurrentClientInvoices(): Observable<InvoiceFull[]> {
        return this.authUserService.getAuthUser().pipe(
            switchMap(user => {
                return this.http.get<InvoiceFull[]>(this.url + "/tenants/" + user.id + "/invoices");
            })
        );
    }
    
    getCurrentClientContracts(): Observable<Contract[]> {
        return this.authUserService.getAuthUser().pipe(
            switchMap(user => {
                return this.http.get<Contract[]>(this.url + "/tenants/" + user.id + "/contracts");
            })
        );
    }
    
    getCurrentClientReports(): Observable<Report[]> {
        return this.authUserService.getAuthUser().pipe(
            switchMap(user => {
                return this.http.get<Report[]>(this.url + "/tenants/" + user.id + "/reports");
            })
        );
    }
}
