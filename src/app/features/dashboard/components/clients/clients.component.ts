import { Component, inject, OnInit } from '@angular/core';
import { TableClientsComponent } from "../table-clients/table-clients.component";
import { ContentBlockComponent } from '../content-block/content-block.component';
import { DashboardBaseComponent } from '../dashboard-base/dashboard-base.component';
import { ClientStateService } from '../../../../core/states/client-state.service';
import { Client, ClientCreate } from '../../../../shared/interfaces/client';
import { Observable } from 'rxjs';
import { ClientService } from '../../../../core/services/client.service';

@Component({
    selector: 'app-clients',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableClientsComponent],
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.scss'
})

export class ClientsComponent implements OnInit {
    protected clients$ = new Observable<Client[]>();
    clients : Client[] = [];
    
    constructor(private clientStateService: ClientStateService){
        this.clientStateService.loadClients();
    }
    
    ngOnInit(): void {
        this.getClientes();
        this.clients$.subscribe((data: Client[]) => {
            this.clients = data;
        });
    }
    
    getClientes(){
        this.clients$ = this.clientStateService.listenToChanges();
    }
}