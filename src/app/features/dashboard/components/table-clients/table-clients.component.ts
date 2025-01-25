import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Tag } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Client } from '../../../../shared/interfaces/client';

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
    imports: [FormsModule, RadioButton, ButtonModule, Tag, TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-clients.component.html',
    styleUrl: './table-clients.component.scss'
})

export class TableClientsComponent implements OnInit{
    clientDialog: boolean = false; 
    @Input() clients: Client[] = [];
    client!: Client;
    selectedClients!: Client[] | null;
    submitted: boolean = false;
    statuses!: any[];
    
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
    
    exportCSV() {
        this.dt.exportCSV();
    }
    
    loadDemoData() {
        this.cd.markForCheck();
        
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        
        this.cols = [
            { field: 'id', header: 'Code', customExportHeader: 'Client Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' },
            { field: 'tenantStatus', header: 'Status' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    openNew() {
        this.client =  {
            id: '',
            name: '',
            phone: '',
            email: '',
            dateOfBirth: '',
            cpf: '',
            rg: '',
            registrationDate: '',
            tenantStatus: '',
            tenantBillingAddress: {
                id: '',
                street: '',
                district: '',
                city: '',
                state: '',
                country: '',
                cep: '',
                complement: '',
                number: 0
            }
        }
        this.submitted = false;
        this.clientDialog = true;
    }
    
    editClient(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
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
    
    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }
    
    deleteClient(client: Client) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + client.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clients = this.clients.filter((val) => val.id !== client.id);
                this.client =  {
                    id: '',
                    name: '',
                    phone: '',
                    email: '',
                    dateOfBirth: '',
                    cpf: '',
                    rg: '',
                    registrationDate: '',
                    tenantStatus: '',
                    tenantBillingAddress: {
                        id: '',
                        street: '',
                        district: '',
                        city: '',
                        state: '',
                        country: '',
                        cep: '',
                        complement: '',
                        number: 0
                    }
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Cliente Deletado',
                    life: 3000
                });
            }
        });
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
            return 'success';
            case 'LOWSTOCK':
            return 'warn';
            case 'OUTOFSTOCK':
            return 'danger';
            default:
            return 'info';
        }
    }
    
    saveClient() {
        this.submitted = true;
        
        if (this.client.name?.trim()) {
            if (this.client.id) {
                this.clients[this.findIndexById(this.client.id)] = this.client;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Cliente Atualizado',
                    life: 3000
                });
            } else {
                this.client.id = this.createId();
                this.clients.push(this.client);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Cliente Criado',
                    life: 3000
                });
            }
            
            this.clients = [...this.clients];
            this.clientDialog = false;
            this.client =  {
                id: '',
                name: '',
                phone: '',
                email: '',
                dateOfBirth: '',
                cpf: '',
                rg: '',
                registrationDate: '',
                tenantStatus: '',
                tenantBillingAddress: {
                    id: '',
                    street: '',
                    district: '',
                    city: '',
                    state: '',
                    country: '',
                    cep: '',
                    complement: '',
                    number: 0
                }
            }
        }
    }
    
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    } 
}