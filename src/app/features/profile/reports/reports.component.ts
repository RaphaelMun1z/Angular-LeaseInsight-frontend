import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { ClientStateService } from '../../../core/states/client-state.service';
import { Report } from '../../../shared/interfaces/report';

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
    selector: 'app-reports',
    imports: [TableModule, FormsModule, DropdownModule, DashboardBaseComponent, ContentBlockComponent, Toolbar, TagModule, IconFieldModule, Button, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss'
})

export class ReportsComponent implements OnInit {
    protected reports$ = new Observable<Report[]>();
    reports! : Report[];
    
    value = signal<string | null>(null);
    statuses!: any[];
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(private clientStateService: ClientStateService, private cd: ChangeDetectorRef){
        this.clientStateService.loadCurrentClientReports();
    }
    
    ngOnInit(): void {
        this.loadDemoData();
        
        this.getCurrentClientReports();
        this.reports$.subscribe((data: Report[]) => {
            this.reports = data;
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
    
    getCurrentClientReports(){
        this.reports$ = this.clientStateService.listenToCurrentClientReports();
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
        for (let i = 0; i < this.reports.length; i++) {
            if (this.reports[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    getStatus(status: string){
        switch (status) {
            case "MAINTENANCE_ISSUE":
            return "Problema de Manutenção";
            case "UTILITY_FAILURE":
            return "Falha em Serviços Públicos";
            case "SECURITY_CONCERN":
            return "Preocupação com Segurança";
            case "PROPERTY_DAMAGE":
            return "Dano à Propriedade";
            case "GENERAL_COMPLAINT":
            return "Reclamação Geral";
            default:
            return "Outro";
        }
    }
    
    getStatusSeverity(status: string) {
        switch (status) {
            case "MAINTENANCE_ISSUE":
            return "warn";
            case "UTILITY_FAILURE":
            return "danger";
            case "SECURITY_CONCERN":
            return "danger";
            case "PROPERTY_DAMAGE":
            return "warn";
            case "GENERAL_COMPLAINT":
            return "info";
            default:
            return "secondary";
        }
    }
}