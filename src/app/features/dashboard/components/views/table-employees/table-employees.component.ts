import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Employee } from '../../../../../shared/interfaces/employee';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-employees',
    imports: [TableComponent],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-employees.component.html',
    styleUrl: './table-employees.component.scss'
})

export class TableEmployeesComponent {
    @Input() employees: Employee[] = [];
    globalFilterFields = ['id', 'name', 'phone', 'email'];
    exportCols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Contract Code' },
        { field: 'name', header: 'Name' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'Email' }
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Nome", code: "name", type: "normal" },
        { name: "Telefone", code: "phone", type: "normal" },
        { name: "E-mail", code: "email", type: "normal" },
    ]
}