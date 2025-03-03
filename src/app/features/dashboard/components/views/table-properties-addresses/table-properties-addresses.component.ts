import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PropertyAddress } from '../../../../../shared/interfaces/propertyAddress';

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
    selector: 'app-table-properties-addresses',
    imports: [FormsModule, ButtonModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-properties-addresses.component.html',
    styleUrl: './table-properties-addresses.component.scss'
})

export class TablePropertiesAddressesComponent implements OnInit{
    @Input() propertiesAddresses: PropertyAddress[] = [];
    propertyAddress!: PropertyAddress;
    selectedPropertiesAddresses!: PropertyAddress[] | null;
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
            { field: 'id', header: 'Code', customExportHeader: 'PropertyAddress Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    openNew() {
        this.propertyAddress =  {
            id: '',
            street: '',
            district: '',
            city: '',
            state: '',
            country: '',
            cep: '',
            complement: ''
        }
        this.submitted = false;
    }
    
    editPropertyAddress(propertyAddress: PropertyAddress) {
        this.propertyAddress = { ...propertyAddress };
    }
    
    deleteSelectedPropertiesAddresses() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os propertyAddresses selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.propertiesAddresses = this.propertiesAddresses.filter((val) => !this.selectedPropertiesAddresses?.includes(val));
                this.selectedPropertiesAddresses = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionários Deletados',
                    life: 3000
                });
            }
        });
    }
    
    deletePropertyAddress(propertyAddress: PropertyAddress) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + propertyAddress.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.propertiesAddresses = this.propertiesAddresses.filter((val) => val.id !== propertyAddress.id);
                this.propertyAddress =  {
                    id: '',
                    street: '',
                    district: '',
                    city: '',
                    state: '',
                    country: '',
                    cep: '',
                    complement: ''
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
        for (let i = 0; i < this.propertiesAddresses.length; i++) {
            if (this.propertiesAddresses[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}