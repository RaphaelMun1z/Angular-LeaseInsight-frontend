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
    
    constructor(private clientStateService: ClientStateService, private clientService: ClientService){
        this.clientStateService.loadClientes();
    }
    
    ngOnInit(): void {
        this.getClientes();
        this.clients$.subscribe((data: Client[]) => {
            this.clients = data;
        });
        
        const clientTest: ClientCreate = {
            id: null,
            name: "Usuario teste",
            phone: "(12) 91234-1234",
            email: "user@gmail.com",
            password: "user123",
            dateOfBirth: "2000-01-11",
            cpf: "785.270.560-03",
            rg: "37.399.345-6",
            registrationDate: "2022-05-20",
            tenantStatus: "PENDING",
            tenantBillingAddress: {
                id: "bc6e2e04-45e5-4ae5-b898-87c2c5331381"
            }
        }
        this.postClient(clientTest);
    }
    
    getClientes(){
        this.clients$ = this.clientStateService.listenToChanges();
    }
    
    postClient(client: ClientCreate){
        this.clientService.saveClient(client).subscribe((_: any) => this.getClientes())
    }
}