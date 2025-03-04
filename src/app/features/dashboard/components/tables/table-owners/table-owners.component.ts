import { Component, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Owner } from '../../../../../shared/interfaces/owner';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-owners',
    imports: [TableComponent],
    templateUrl: './table-owners.component.html',
    styleUrl: './table-owners.component.scss'
})

export class TableOwnersComponent {
    @Input() owners: Owner[] = [];
    globalFilterFields = ['id', 'name', 'phone', 'email'];
    exportCols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Owner Code' },
        { field: 'name', header: 'Name' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'E-mail' }
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Nome", code: "name", type: "normal" },
        { name: "Telefone", code: "phone", type: "normal" },
        { name: "E-mail", code: "email", type: "normal" },
    ]
}