import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Tag } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { Contract } from '../../../../../shared/interfaces/contract';

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
    selector: 'app-table-contracts',
    imports: [FormsModule, Tag, DatePickerModule, InputNumber, FluidModule, ButtonModule, TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-contracts.component.html',
    styleUrl: './table-contracts.component.scss'
})

export class TableContractsComponent implements OnInit{
    contractDialog: boolean = false; 
    @Input() contracts: Contract[] = [];
    contract!: Contract;
    selectedContracts!: Contract[] | null;
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
            { field: 'id', header: 'Code', customExportHeader: 'Contract Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    openNew() {
        this.contract = {
            id: '',
            contractStartDate: '',
            contractEndDate: '',
            defaultRentalValue: 0,
            contractStatus: '',
            tenant: {
                name: '',
            },
            residence: {
                number: 0,
                residenceAddress: {
                    street: '',
                    district: '',
                    city: '',
                    state: '',
                    country: ''
                },
            }
        } 
        this.submitted = false;
        this.contractDialog = true;
    }
    
    editContract(contract: Contract) {
        this.contract = { ...contract };
        this.contractDialog = true;
    }
    
    deleteSelectedContracts() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os contractes selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contracts = this.contracts.filter((val) => !this.selectedContracts?.includes(val));
                this.selectedContracts = null;
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
        this.contractDialog = false;
        this.submitted = false;
    }
    
    deleteContract(contract: Contract) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + contract.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contracts = this.contracts.filter((val) => val.id !== contract.id);
                this.contract = {
                    id: '',
                    contractStartDate: '',
                    contractEndDate: '',
                    defaultRentalValue: 0,
                    contractStatus: '',
                    tenant: {
                        name: '',
                    },
                    residence: {
                        number: 0,
                        residenceAddress: {
                            street: '',
                            district: '',
                            city: '',
                            state: '',
                            country: ''
                        },
                    }
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
        for (let i = 0; i < this.contracts.length; i++) {
            if (this.contracts[i].id === id) {
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
            case 'ACTIVE':
            return 'success';
            case 'LOWSTOCK':
            return 'warn';
            case 'TERMINATED':
            return 'danger';
            default:
            return 'info';
        }
    }
    
    saveContract() {
        this.submitted = true;
        
        if (this.contract.id) {
            this.contracts[this.findIndexById(this.contract.id)] = this.contract;
            this.messageService.add({
                severity: 'success',
                summary: 'Operação Realizada',
                detail: 'Funcionário Atualizado',
                life: 3000
            });
        } else {
            this.contract.id = this.createId();
            this.contracts.push(this.contract);
            this.messageService.add({
                severity: 'success',
                summary: 'Operação Realizada',
                detail: 'Funcionário Criado',
                life: 3000
            });
        }
        
        this.contracts = [...this.contracts];
        this.contractDialog = false;
        this.contract = {
            id: '',
            contractStartDate: '',
            contractEndDate: '',
            defaultRentalValue: 0,
            contractStatus: '',
            tenant: {
                name: '',
            },
            residence: {
                number: 0,
                residenceAddress: {
                    street: '',
                    district: '',
                    city: '',
                    state: '',
                    country: ''
                },
            }
        }
    }
    
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    } 
}