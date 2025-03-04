import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ClientStateService } from '../../../../core/states/client-state.service';
import { Client } from '../../../../shared/interfaces/client';

import { TableClientsComponent } from '../../components/tables/table-clients/table-clients.component';
import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';

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