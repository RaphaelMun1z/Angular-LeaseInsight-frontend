import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ClientStateService } from '../../../../../../../../core/states/client-state.service';
import { Client } from '../../../../../../../../shared/interfaces/client';
import { FormHandler } from '../../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../../core/services/stepped-forms/contract-form.service';

import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-client',
    imports: [TableModule, TagModule, ButtonModule, FormsModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    templateUrl: './select-client.component.html',
    styleUrl: './select-client.component.scss'
})

export class SelectClientComponent implements OnInit {
    form!: FormGroup;
    contractCreateForm!: FormHandler;
    
    @ViewChild('dt') dt!: Table;
    statuses!: any[];
    loading: boolean = true;
    protected clients$ = new Observable<Client[]>();
    clients : Client[] = [];
    
    router = inject(Router);
    private clientStateService = inject(ClientStateService);
    constructor(){
        this.clientStateService.loadClients();
    }
    
    public contractFormService = inject(ContractFormService);
    
    ngOnInit() {
        this.form = this.contractFormService.getStep2Form();
        
        this.clients$ = this.clientStateService.listenToClientsChanges();
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
    
    clear(table: Table) {
        table.clear();
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            tenant: {
                id: idSelected
            }
        });
        this.router.navigate(['/dashboard/contratos/criar/detalhes']);
    }
}