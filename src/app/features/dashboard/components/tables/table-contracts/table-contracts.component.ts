import { Component, inject, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Contract } from '../../../../../shared/interfaces/contract';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { ContractService } from '../../../../../core/services/contract.service';
import { ContractStateService } from '../../../../../core/states/contract-state.service';

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
    
    private service = inject(ContractService);
    private stateService = inject(ContractStateService);
    private messageService = inject(MessageService);
    
    deleteContract = (ownerId: string) => {
        console.log(ownerId)
        this.service.deleteContract(ownerId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Contrato excluído com sucesso!'
                });
                this.stateService.removeContract(ownerId);
            },
            error: (err: any) => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: err.message 
                });
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }
}