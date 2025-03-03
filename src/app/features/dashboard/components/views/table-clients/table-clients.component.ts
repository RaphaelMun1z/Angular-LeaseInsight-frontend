import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Tag } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Client, ClientCreate } from '../../../../../shared/interfaces/client';

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
    selector: 'app-table-clients',
    imports: [FormsModule, ButtonModule, Tag, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-clients.component.html',
    styleUrl: './table-clients.component.scss'
})

export class TableClientsComponent implements OnInit{
    @Input() clients: Client[] = [];
    selectedClients!: Client[] | null;
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];

    globalFilterFields = ['id', 'name', 'phone', 'email', 'registrationDate'];
    
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}
    
    ngOnInit(): void {
        this.configureTable();
    }
    
    exportCSV() {
        this.dt.exportCSV();
    }
    
    configureTable() {
        this.cd.markForCheck();

        this.cols = [
            { field: 'id', header: 'Code', customExportHeader: 'Client Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' },
            { field: 'tenantStatus', header: 'Status' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    deleteSelectedClients() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os clientes selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clients = this.clients.filter((val) => !this.selectedClients?.includes(val));
                this.selectedClients = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Clientes Deletados',
                    life: 3000
                });
            }
        });
    }
    
    deleteClient(client: Client) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + client.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clients = this.clients.filter((val) => val.id !== client.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Cliente Deletado',
                    life: 3000
                });
            }
        });
    }
}