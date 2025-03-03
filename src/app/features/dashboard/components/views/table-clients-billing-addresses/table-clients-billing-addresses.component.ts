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
    selector: 'app-table-clients-billing-addresses',
    imports: [FormsModule, ButtonModule, TableModule, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-clients-billing-addresses.component.html',
    styleUrl: './table-clients-billing-addresses.component.scss'
})

export class TableClientsBillingAddressesComponent implements OnInit{
    @Input() billingAddresses: PropertyAddress[] = [];
    selectedBillingAddresses!: PropertyAddress[] | null;

    globalFilterFields = ['street', 'district', 'city', 'state', 'country', 'cep', 'complement'];
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
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
            { field: 'id', header: 'Code', customExportHeader: 'PropertyAddress Code' },
            { field: 'street', header: 'street' },
            { field: 'district', header: 'district' },
            { field: 'city', header: 'city' },
            { field: 'state', header: 'state' },
            { field: 'country', header: 'country' },
            { field: 'cep', header: 'cep' },
            { field: 'complement', header: 'complement' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    deleteSelectedBillingAddresses() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os propertyAddresses selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.billingAddresses = this.billingAddresses.filter((val) => !this.selectedBillingAddresses?.includes(val));
                this.selectedBillingAddresses = null;
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
                this.billingAddresses = this.billingAddresses.filter((val) => val.id !== propertyAddress.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Deletado',
                    life: 3000
                });
            }
        });
    }
}
