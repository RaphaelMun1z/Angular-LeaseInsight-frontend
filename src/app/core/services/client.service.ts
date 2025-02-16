import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Client, ClientCreate } from '../../shared/interfaces/client';
import { environment } from '../../../environments/environment';
import { Invoice, InvoiceFull } from '../../shared/interfaces/invoice';
import { AuthService } from './auth.service';
import { Contract } from '../../shared/interfaces/contract';
import { Report } from '../../shared/interfaces/report';

@Injectable({
    providedIn: 'root'
})

export class ClientService { 
    private url = environment.api;
    
    authService = inject(AuthService);
    constructor(private http: HttpClient) { }
    
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.url + "/tenants");
    }
    
    saveClient(client: ClientCreate): any {
        return this.http.post<ClientCreate>(this.url + "/tenants", client);
    }
    
    getClientById(id: string): Observable<Client> {
        return this.http.get<Client>(this.url + "/tenants/" + id);
    }
    
    getClientInvoices(id: string): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.url + "/tenants/" + id + "/invoices");
    }
    
    getCurrentClientInvoices(): Observable<InvoiceFull[]> {
        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                return this.http.get<InvoiceFull[]>(this.url + "/tenants/" + user.id + "/invoices");
            })
        );
    }

    getCurrentClientContracts(): Observable<Contract[]> {
        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                return this.http.get<Contract[]>(this.url + "/tenants/" + user.id + "/contracts");
            })
        );
    }

    getCurrentClientReports(): Observable<Report[]> {
        return this.authService.getCurrentUser().pipe(
            switchMap(user => {
                return this.http.get<Report[]>(this.url + "/tenants/" + user.id + "/reports");
            })
        );
    }
}
