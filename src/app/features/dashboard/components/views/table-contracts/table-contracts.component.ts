import { Component, Input } from '@angular/core';

import { TableComponent } from '../table/table.component';
import { Contract } from '../../../../../shared/interfaces/contract';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-contracts',
    imports: [TableComponent],
    templateUrl: './table-contracts.component.html',
    styleUrl: './table-contracts.component.scss'
})

export class TableContractsComponent {
    @Input() contracts: Contract[] = [];
    globalFilterFields = ['id', 'contractStartDate', 'contractEndDate', 'defaultRentalValue', 'contractStatus', 'name', 'residenceAddress']
    exportCols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Contract Code' },
        { field: 'contractStartDate', header: 'ContractStartDate' },
        { field: 'contractEndDate', header: 'ContractEndDate' },
        { field: 'defaultRentalValue', header: 'DefaultRentalValue' },
        { field: 'contractStatus', header: 'ContractStatus' },
        { field: 'tenant.name', header: 'TenantName' },
        { field: 'residence.residenceAddress.district', header: 'ResidenceAddress' },
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Início do Contrato", code: "contractStartDate", type: "normal" },
        { name: "Validade do Contrato", code: "contractEndDate", type: "normal" },
        { name: "Valor de Locação", code: "defaultRentalValue", type: "normal" },
        { name: "Status", code: "contractStatus", type: "tag" },
        { name: "Nome do Inquilino", code: "tenant.name", type: "normal" },
        { name: "Endereço da Residência", code: "residence.residenceAddress.district", type: "normal" },
    ]
}