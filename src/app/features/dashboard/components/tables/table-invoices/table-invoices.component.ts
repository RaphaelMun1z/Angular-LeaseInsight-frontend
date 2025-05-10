import { Component, inject, Input, OnInit } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Invoice } from '../../../../../shared/interfaces/invoice';
import { InvoiceService } from '../../../../../core/services/invoice.service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';
import { InvoiceStateService } from '../../../../../core/states/invoice-state.service';

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
    
    private service = inject(InvoiceService);
    private stateService = inject(InvoiceStateService);
    private messageService = inject(MessageService);
    
    deleteInvoice = (invoiceId: string) => {
        console.log(invoiceId)
        this.service.deleteInvoice(invoiceId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Fatura excluída com sucesso!'
                });
                this.stateService.removeInvoice(invoiceId);
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