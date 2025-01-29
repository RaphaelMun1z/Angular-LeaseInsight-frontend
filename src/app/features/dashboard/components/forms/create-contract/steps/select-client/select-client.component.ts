import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ClientStateService } from '../../../../../../../core/states/client-state.service';
import { Client } from '../../../../../../../shared/interfaces/client';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-select-client',
    imports: [TableModule, TagModule, ButtonModule, FormsModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    templateUrl: './select-client.component.html',
    styleUrl: './select-client.component.scss'
})

export class SelectClientComponent implements OnInit {
    protected clients$ = new Observable<Client[]>();
    clients : Client[] = [];
    
    @ViewChild('dt') dt!: Table;
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    
    constructor(private clientStateService: ClientStateService){
        this.clientStateService.loadClientes();
    }
    
    ngOnInit() {
        this.getClientes();
        this.clients$.subscribe((data: Client[]) => {
            this.clients = data;
            this.loading = false;
        });
        
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }
    
    getClientes(){
        this.clients$ = this.clientStateService.listenToChanges();
    }
    
    clear(table: Table) {
        table.clear();
    }
}