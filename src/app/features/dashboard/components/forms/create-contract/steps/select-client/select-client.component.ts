import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ClientStateService } from '../../../../../../../core/states/client-state.service';
import { CreateContractComponent } from '../../create-contract.component';
import { Client } from '../../../../../../../shared/interfaces/client';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-select-client',
    imports: [TableModule, TagModule, ButtonModule, FormsModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    templateUrl: './select-client.component.html',
    styleUrl: './select-client.component.scss'
})

export class SelectClientComponent implements OnInit {
    form!: FormGroup;
    
    @ViewChild('dt') dt!: Table;
    statuses!: any[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    
    protected clients$ = new Observable<Client[]>();
    clients : Client[] = [];
    
    private formContainer = inject(CreateContractComponent);
    constructor(private clientStateService: ClientStateService){
        this.clientStateService.loadClientes();
    }
    
    ngOnInit() {
        this.form = this.formContainer.getStep2Form();
        
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
    
    selected(idSelected: string){
        this.form.patchValue({
            tenant: {
                id: idSelected
            }
        });
    }
}