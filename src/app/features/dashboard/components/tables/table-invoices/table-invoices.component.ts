import { Component, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Invoice } from '../../../../../shared/interfaces/invoice';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-invoices',
    imports: [TableComponent],
    templateUrl: './table-invoices.component.html',
    styleUrl: './table-invoices.component.scss'
})

export class TableInvoicesComponent {
    @Input() invoices: Invoice[] = [];
    globalFilterFields = ['rentalStartDate', 'rentalEndDate', 'rentalValue', 'paymentStatus', 'contractId', 'residenceId'];
    exportCols: Column[] = [
        { field: 'rentalStartDate', header: 'RentalStartDate', customExportHeader: 'Contract Code' },
        { field: 'rentalEndDate', header: 'RentalEndDate' },
        { field: 'rentalValue', header: 'RentalValue' },
        { field: 'paymentStatus', header: 'PaymentStatus' },
        { field: 'contractId', header: 'ContractId' },
        { field: 'residenceId', header: 'ResidenceId' },
    ];
    fields = [
        { name: "Início", code: "rentalStartDate", type: "normal" },
        { name: "Validade", code: "rentalEndDate", type: "normal" },
        { name: "Valor", code: "rentalValue", type: "normal" },
        { name: "Status", code: "paymentStatus", type: "tag" },
        { name: "Código do Contrato", code: "contractId", type: "normal" },
        { name: "Código da Propriedade", code: "residenceId", type: "normal" },
    ]
}