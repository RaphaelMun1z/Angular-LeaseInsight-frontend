import { ChangeDetectorRef, Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { ClientStateService } from '../../../core/states/client-state.service';

import { DashboardBaseComponent } from '../../dashboard/components/dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../dashboard/components/content-block/content-block.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Table } from 'primeng/table';
import { Contract } from '../../../shared/interfaces/contract';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-contracts',
    imports: [TableModule, FormsModule, DropdownModule, DashboardBaseComponent, ContentBlockComponent, Toolbar, TagModule, IconFieldModule, Button, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    providers: [ConfirmationService],
    templateUrl: './contracts.component.html',
    styleUrl: './contracts.component.scss'
})

export class ContractsComponent implements OnInit {
    protected contracts$ = new Observable<Contract[]>();
    contracts! : Contract[];
    
    value = signal<string | null>(null);
    statuses!: any[];
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(private clientStateService: ClientStateService, private cd: ChangeDetectorRef){
        this.clientStateService.loadCurrentClientContracts();
    }
    
    ngOnInit(): void {
        this.loadDemoData();
        
        this.getCurrentClientContracts();
        this.contracts$.subscribe((data: Contract[]) => {
            this.contracts = data;
        });
        
        this.statuses = [
            { label: 'ACTIVE', value: 'ACTIVE' },
            { label: 'TERMINATED', value: 'TERMINATED' },
            { label: 'EXPIRED', value: 'EXPIRED' },
            { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' },
            { label: 'APPROVED', value: 'APPROVED' },
            { label: 'REJECTED', value: 'REJECTED' },
            { label: 'UNDER_REVIEW', value: 'UNDER_REVIEW' },
            { label: 'RENEWED', value: 'RENEWED' },
            { label: 'CANCELED', value: 'CANCELED' },
            { label: 'SUSPENDED', value: 'SUSPENDED' },
            { label: 'IN_NEGOTIATION', value: 'IN_NEGOTIATION' },
            { label: 'HOLD', value: 'HOLD' },
        ];
    }
    
    getCurrentClientContracts(){
        this.contracts$ = this.clientStateService.listenToCurrentClientContracts();
    }
    
    loadDemoData() {
        this.cd.markForCheck();
        
        this.cols = [
            { field: 'id', header: 'Code', customExportHeader: 'Employee Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    exportCSV() {
        this.dt.exportCSV();
    }
    
    clear(table: Table) {
        table.clear();
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    getStatus(status: string){
        switch (status) {
            case "ACTIVE":
            return "Ativo";
            case "TERMINATED":
            return "Encerrado";
            case "EXPIRED":
            return "Expirado";
            case "PENDING_APPROVAL":
            return "Aguardando Aprovação";
            case "APPROVED":
            return "Aprovado";
            case "REJECTED":
            return "Rejeitado";
            case "UNDER_REVIEW":
            return "Em Análise";
            case "RENEWED":
            return "Renovado";
            case "CANCELED":
            return "Cancelado";
            case "SUSPENDED":
            return "Suspenso";
            case "IN_NEGOTIATION":
            return "Em Negociação";
            case "HOLD":
            return "Em Espera";
            default:
            return "Outro";
        }
    }
    
    getStatusSeverity(status: string) {
        switch (status) {
            case "ACTIVE":
            return "success";
            case "TERMINATED":
            return "danger";
            case "EXPIRED":
            return "warn";
            case "PENDING_APPROVAL":
            return "info";
            case "APPROVED":
            return "success";
            case "REJECTED":
            return "danger";
            case "UNDER_REVIEW":
            return "info";
            case "RENEWED":
            return "success";
            case "CANCELED":
            return "danger";
            case "SUSPENDED":
            return "warn";
            case "IN_NEGOTIATION":
            return "info";
            case "HOLD":
            return "secondary";
            default:
            return "secondary";
        }
    }
}