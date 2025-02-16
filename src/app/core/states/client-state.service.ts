import { inject, Injectable } from '@angular/core';
import { ClientService } from '../services/client.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Client } from '../../shared/interfaces/client';
import { InvoiceFull } from '../../shared/interfaces/invoice';
import { Contract } from '../../shared/interfaces/contract';
import { Report } from '../../shared/interfaces/report';

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
    
    loadClients(){
        this.clientService
        .getClients()
        .pipe(take(1))
        .subscribe(clients => this.shareClients(clients))
    }
    
    private shareClients(clients: Client[]){
        this.clients$.next(clients);
    }
    
    loadClient(id: string){
        this.clientService
        .getClientById(id)
        .pipe(take(1))
        .subscribe(Client => this.shareClient(Client))
    }
    
    private shareClient(client: Client){
        this.client$.next(client);
    }

    loadCurrentClientInvoices(){
        this.clientService
        .getCurrentClientInvoices()
        .pipe(take(1))
        .subscribe(currentClientInvoices => this.shareClientInvoices(currentClientInvoices))
    }
    
    private shareClientInvoices(currentClientInvoices: InvoiceFull[]){
        this.currentClientInvoices$.next(currentClientInvoices);
    }

    loadCurrentClientContracts(){
        this.clientService
        .getCurrentClientContracts()
        .pipe(take(1))
        .subscribe(currentClientContracts => this.shareClientContracts(currentClientContracts))
    }
    
    private shareClientContracts(currentClientContracts: Contract[]){
        this.currentClientContracts$.next(currentClientContracts);
    }

    loadCurrentClientReports(){
        this.clientService
        .getCurrentClientReports()
        .pipe(take(1))
        .subscribe(currentClientReports => this.shareClientReports(currentClientReports))
    }
    
    private shareClientReports(currentClientReports: Report[]){
        this.currentClientReports$.next(currentClientReports);
    }
    
    listenToChanges(): Observable<Client[]>{
        return this.clients$.asObservable();
    }
    
    listenToClient(): Observable<Client | null>{
        return this.client$.asObservable();
    }

    listenToCurrentClientInvoices(): Observable<InvoiceFull[]>{
        return this.currentClientInvoices$.asObservable();
    }
    
    listenToCurrentClientContracts(): Observable<Contract[]>{
        return this.currentClientContracts$.asObservable();
    }

    listenToCurrentClientReports(): Observable<Report[]>{
        return this.currentClientReports$.asObservable();
    }
    
    addClient(client: Client){
        const currentClients = this.clients$.value;
        this.clients$.next([...currentClients, client]);
    }
}
