import { ChangeDetectorRef, Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Invoice } from '../../../shared/interfaces/invoice';

import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Table } from 'primeng/table';
import { InvoiceStateService } from '../../../core/states/invoice-state.service';
import { Observable } from 'rxjs';
import { DashboardBaseComponent } from '../../dashboard/components/dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../dashboard/components/content-block/content-block.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

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
    selector: 'app-invoices',
    imports: [TableModule, FormsModule, DropdownModule, DashboardBaseComponent, ContentBlockComponent, Toolbar, TagModule, IconFieldModule, Button, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})

export class InvoicesComponent implements OnInit {
    protected invoices$ = new Observable<Invoice[]>();
    invoices : Invoice[] = [];
    
    value = signal<string | null>(null);
    statuses!: any[];
    selectedInvoices!: Invoice[] | null;
    invoice!: Invoice;
    invoiceDialog: boolean = false; 
    submitted: boolean = false;
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(private invoiceStateService: InvoiceStateService, private cd: ChangeDetectorRef){
        this.invoiceStateService.loadInvoices();
    }
    
    ngOnInit(): void {
        this.loadDemoData();
        
        this.getInvoices();
        this.invoices$.subscribe((data: Invoice[]) => {
            this.invoices = data;
        });
        
        this.statuses = [
            { label: 'PENDING', value: 'PENDING' },
            { label: 'PAID', value: 'PAID' },
            { label: 'OVERDUE', value: 'OVERDUE' },
            { label: 'CANCELED', value: 'CANCELED' },
            { label: 'IN_PROCESS', value: 'IN_PROCESS' },
            { label: 'PARTIALLY_PAID', value: 'PARTIALLY_PAID' },
            { label: 'DISPUTED', value: 'DISPUTED' },
            { label: 'REFUNDED', value: 'REFUNDED' },
            { label: 'IN_COLLECTION', value: 'IN_COLLECTION' },
        ];
    }
    
    getInvoices(){
        this.invoices$ = this.invoiceStateService.listenToChanges();
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
        for (let i = 0; i < this.invoices.length; i++) {
            if (this.invoices[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    getStatus(status: number){
        switch (status) {
            case 1:
            return 'Pendente';
            case 2:
            return 'Pago';
            case 3:
            return 'Vencido';
            case 4:
            return 'Cancelado';
            case 5:
            return 'Em processo';
            case 6:
            return 'Pago parcialmente';
            case 7:
            return 'Em disputa';
            case 8:
            return 'Reembolsado';
            case 9:
            return 'Em cobrança';
            default:
            return 'Outro'
        }
    }
    
    getStatusSeverity(status: number) {
        switch (status) {
            case 1:
            return 'info';
            case 2:
            return 'success';
            case 3:
            return 'warn';
            case 4:
            return 'secondary';
            case 5:
            return 'secondary';
            case 6:
            return 'contrast';
            case 7:
            return 'danger';
            case 8:
            return 'success';
            case 9:
            return 'warn';
            default:
            return 'secondary';
        }
    }
}
