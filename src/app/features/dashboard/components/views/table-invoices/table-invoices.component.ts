import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Invoice } from '../../../../../shared/interfaces/invoice';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

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
    selector: 'app-table-invoices',
    imports: [TableModule, Toolbar, TagModule, IconFieldModule, Button, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-invoices.component.html',
    styleUrl: './table-invoices.component.scss'
})

export class TableInvoicesComponent implements OnInit {
    @Input() invoices: Invoice[] = [];
    selectedInvoices!: Invoice[] | null;
    invoice!: Invoice;
    invoiceDialog: boolean = false; 
    submitted: boolean = false;
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadDemoData();
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
    
    editInvoice(invoice: Invoice) {
        this.invoice = { ...invoice };
        this.invoiceDialog = true;
    }
    
    deleteSelectedInvoices() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os invoicees selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.invoices = this.invoices.filter((val) => !this.selectedInvoices?.includes(val));
                this.selectedInvoices = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionários Deletados',
                    life: 3000
                });
            }
        });
    }
    
    hideDialog() {
        this.invoiceDialog = false;
        this.submitted = false;
    }
    
    deleteInvoice(invoice: Invoice) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + invoice.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.invoices = this.invoices.filter((val) => val.id !== invoice.id);
                this.invoice =  {
                    id: '',
                    rentalStartDate: '',
                    rentalEndDate: '',
                    rentalValue: 0,
                    paymentStatus: 0,
                    contractId: '',
                    residenceId: '',
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Deletado',
                    life: 3000
                });
            }
        });
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
}
