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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    standalone: true,
    imports: [CommonModule, RouterModule, ConfirmDialogModule, TableModule, Tag, DropdownModule, InputTextModule, TextareaModule, ToastModule, SelectModule, InputIconModule, IconFieldModule, ButtonModule, ToolbarModule],
    providers: [ConfirmationService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {
    @Input() items!: any[];
    @Input() fields!: {name: string; code: string, type: string}[];
    @Input() editUrl!: string;
    selectedItems!: any[] | null;
    @Input() delItemFunc!: (itemId: string) => void;
    
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
    
    deleteItemDB(itemId: string) {
        if (this.delItemFunc) {
            this.delItemFunc(itemId);
        } else {
            console.error('deleteItemDB function not provided');
            this.messageService.add({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Não foi possível completar a operação',
                life: 3000
            });
        }
    }
    
    deleteSelectedItems(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Atenção!',
            message: 'Tem certeza que deseja excluir os registro selecionados?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Excluir',
                severity: 'danger'
            },
            accept: () => {
                this.selectedItems?.forEach((item) => {
                    this.deleteItemDB(item.id);
                });
                this.items = this.items.filter((val) => !this.selectedItems?.includes(val));
                this.selectedItems = null;
            }
        });
    }
    
    deleteItem(event: Event, item: any) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            header: 'Atenção!',
            message: 'Tem certeza que deseja excluir este registro?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Excluir',
                severity: 'danger'
            },
            accept: () => {
                this.deleteItemDB(item.id);
                this.items = this.items.filter((val) => val.id !== item.id);
            }
        });
    }
    
    getValueByPath(item: any, path: string): any {
        return path.split('.').reduce((acc, key) => acc && acc[key], item);
    }
}
