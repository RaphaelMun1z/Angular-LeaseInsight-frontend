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
import { Owner } from '../../../../../shared/interfaces/owner';

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
    selector: 'app-table-owners',
    imports: [FormsModule, ButtonModule, TableModule, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-owners.component.html',
    styleUrl: './table-owners.component.scss'
})

export class TableOwnersComponent implements OnInit{
    @Input() owners: Owner[] = [];
    owner!: Owner;
    selectedOwners!: Owner[] | null;
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
            { field: 'id', header: 'Code', customExportHeader: 'Owner Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    editOwner(owner: Owner) {
        this.owner = { ...owner };
    }
    
    deleteSelectedOwners() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os owneres selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.owners = this.owners.filter((val) => !this.selectedOwners?.includes(val));
                this.selectedOwners = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionários Deletados',
                    life: 3000
                });
            }
        });
    }
    
    deleteOwner(owner: Owner) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + owner.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.owners = this.owners.filter((val) => val.id !== owner.id);
                this.owner =  {
                    id: '',
                    name: '',
                    phone: '',
                    email: '',
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
        for (let i = 0; i < this.owners.length; i++) {
            if (this.owners[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}