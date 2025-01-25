import { inject, Injectable } from '@angular/core';
import { ClientService } from '../services/client.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Client } from '../../shared/interfaces/client';

@Injectable({
    providedIn: 'root'
})

export class ClientStateService {
    private clients$ = new BehaviorSubject<Client[]>([]);
    private clientService = inject(ClientService);
    
    constructor() { }
    
    loadClientes(){
        this.clientService
        .getClients()
        .pipe(take(1))
        .subscribe(clients => this.shareClients(clients))
    }
    
    private shareClients(clients: Client[]){
        this.clients$.next(clients);
    }
    
    listenToChanges(): Observable<Client[]>{
        return this.clients$.asObservable();
    }
    
    addClient(client: Client){
        const currentClients = this.clients$.value;
        this.clients$.next([...currentClients, client]);
    }
}
