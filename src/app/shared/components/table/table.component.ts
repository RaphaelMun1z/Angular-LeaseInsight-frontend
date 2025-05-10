import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Table } from 'primeng/table';
import { Tag } from 'primeng/tag';

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
    selector: 'app-table',
    imports: [CommonModule, RouterModule, TableModule, Tag, DropdownModule, InputTextModule, TextareaModule, ToastModule, SelectModule, InputIconModule, IconFieldModule, ButtonModule, ToolbarModule],
    providers: [ConfirmationService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
    @Input() items!: any[];
    @Input() fields!: {name: string; code: string, type: string}[];
    @Input() editUrl!: string;
    selectedItems!: any[] | null;
    
    @ViewChild('dt') dt!: Table;
    @Input() exportCols!: Column[];
    exportColumns!: ExportColumn[];
    
    @Input() globalFilterFields!: string[];
    
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
        this.exportColumns = this.exportCols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    deleteSelectedItems() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os itens selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.items = this.items.filter((val) => !this.selectedItems?.includes(val));
                this.selectedItems = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Clientes Deletados',
                    life: 3000
                });
            }
        });
    }
    
    deleteItem(item: any) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + item.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.items = this.items.filter((val) => val.id !== item.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Registro Deletado',
                    life: 3000
                });
            }
        });
    }

    getValueByPath(item: any, path: string): any {
        return path.split('.').reduce((acc, key) => acc && acc[key], item);
    }
}
