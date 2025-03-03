import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableComponent } from '../table/table.component';
import { Client } from '../../../../../shared/interfaces/client';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-clients',
    imports: [TableComponent, FormsModule],
    templateUrl: './table-clients.component.html',
    styleUrl: './table-clients.component.scss'
})

export class TableClientsComponent {
    @Input() clients: Client[] = [];
    globalFilterFields = ['id', 'name', 'phone', 'email', 'tenantStatus'];
    cols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Contract Code' },
        { field: 'name', header: 'Name' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'E-mail' },
        { field: 'tenantStatus', header: 'TenantStatus' },
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Nome", code: "name", type: "normal" },
        { name: "Telefone", code: "phone", type: "normal" },
        { name: "E-mail", code: "email", type: "normal" },
        { name: "Status", code: "tenantStatus", type: "tag" },
    ]
}