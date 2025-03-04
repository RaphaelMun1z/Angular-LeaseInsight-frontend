import { inject, Injectable } from '@angular/core';
import { ClientService } from '../services/client.service';
import { BehaviorSubject, catchError, Observable, of, take, throwError } from 'rxjs';
import { Client } from '../../shared/interfaces/client';
import { InvoiceFull } from '../../shared/interfaces/invoice';
import { Contract } from '../../shared/interfaces/contract';
import { Report } from '../../shared/interfaces/report';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ClientStateService {
    private clients$ = new BehaviorSubject<Client[]>([]);
    private client$ = new BehaviorSubject<Client | null>(null);
    private currentClientInvoices$ = new BehaviorSubject<InvoiceFull[]>([]);
    private currentClientContracts$ = new BehaviorSubject<Contract[]>([]);
    private currentClientReports$ = new BehaviorSubject<Report[]>([]);
    
    private clientService = inject(ClientService);
    constructor() { }
    
    // Get All
    loadClients(){
        this.clientService
        .getClients()
        .pipe(take(1))
        .subscribe(clients => this.shareClients(clients))
    }
    
    private shareClients(clients: Client[]){
        this.clients$.next(clients);
    }
    
    listenToClientsChanges(): Observable<Client[]>{
        return this.clients$.asObservable();
    }
    
    // Get By Id
    loadClient(id: string): Observable<Client | null> {
        return this.clientService.getClientById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Client
    addClient(client: Client){
        const currentClients = this.clients$.value;
        this.clients$.next([...currentClients, client]);
    }
    
    // Get Current Client Invoices
    loadCurrentClientInvoices(){
        this.clientService
        .getCurrentClientInvoices()
        .pipe(take(1))
        .subscribe(currentClientInvoices => this.shareClientInvoices(currentClientInvoices))
    }
    
    private shareClientInvoices(currentClientInvoices: InvoiceFull[]){
        this.currentClientInvoices$.next(currentClientInvoices);
    }
    
    listenToCurrentClientInvoices(): Observable<InvoiceFull[]>{
        return this.currentClientInvoices$.asObservable();
    }
    
    // Get Current Client Contracts
    loadCurrentClientContracts(){
        this.clientService
        .getCurrentClientContracts()
        .pipe(take(1))
        .subscribe(currentClientContracts => this.shareClientContracts(currentClientContracts))
    }
    
    private shareClientContracts(currentClientContracts: Contract[]){
        this.currentClientContracts$.next(currentClientContracts);
    }
    
    listenToCurrentClientContracts(): Observable<Contract[]>{
        return this.currentClientContracts$.asObservable();
    }
    
    // Get Current Client Reports
    loadCurrentClientReports(){
        this.clientService
        .getCurrentClientReports()
        .pipe(take(1))
        .subscribe(currentClientReports => this.shareClientReports(currentClientReports))
    }
    
    private shareClientReports(currentClientReports: Report[]){
        this.currentClientReports$.next(currentClientReports);
    }
    
    listenToCurrentClientReports(): Observable<Report[]>{
        return this.currentClientReports$.asObservable();
    }
}
