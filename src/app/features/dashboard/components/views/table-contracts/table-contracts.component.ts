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
    imports: [FormsModule, Tag, DatePickerModule, FluidModule, ButtonModule, TableModule, SelectModule, ToastModule, ToolbarModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-contracts.component.html',
    styleUrl: './table-contracts.component.scss'
})

export class TableContractsComponent implements OnInit{
    @Input() contracts: Contract[] = [];
    selectedContracts!: Contract[] | null;
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];

    globalFilterFields = ['contract.id', 'contractStartDate', 'contractEndDate', 'defaultRentalValue', 'contractStatus', 'tenant.name', 'residenceAddress']
    
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
            { field: 'id', header: 'Code', customExportHeader: 'Contract Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
    
    deleteContract(contract: Contract) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + contract.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contracts = this.contracts.filter((val) => val.id !== contract.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Deletado',
                    life: 3000
                });
            }
        });
    }
    
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    } 
}