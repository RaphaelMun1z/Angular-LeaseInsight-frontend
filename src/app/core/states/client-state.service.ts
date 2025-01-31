import { inject, Injectable } from '@angular/core';
import { ClientService } from '../services/client.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Client } from '../../shared/interfaces/client';

@Injectable({
    providedIn: 'root'
})

export class ClientStateService {
    private clients$ = new BehaviorSubject<Client[]>([]);
    private client$ = new BehaviorSubject<Client | null>(null);
    
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
    
    listenToChanges(): Observable<Client[]>{
        return this.clients$.asObservable();
    }
    
    listenToClient(): Observable<Client | null>{
        return this.client$.asObservable();
    }
    
    addClient(client: Client){
        const currentClients = this.clients$.value;
        this.clients$.next([...currentClients, client]);
    }
}
