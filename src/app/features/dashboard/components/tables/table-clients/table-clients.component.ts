import { Component, inject, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Client } from '../../../../../shared/interfaces/client';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { ClientService } from '../../../../../core/services/client.service';
import { ClientStateService } from '../../../../../core/states/client-state.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-clients',
    imports: [TableComponent],
    templateUrl: './table-clients.component.html',
    styleUrl: './table-clients.component.scss'
})

export class TableClientsComponent {
    @Input() clients: Client[] = [];
    globalFilterFields = ['id', 'name', 'phone', 'email', 'tenantStatus'];
    exportCols: Column[] = [
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
    
    private service = inject(ClientService);
    private stateService = inject(ClientStateService);
    private messageService = inject(MessageService);
    
    deleteClient = (clientId: string) => {
        console.log(clientId)
        this.service.deleteClient(clientId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Cliente excluído com sucesso!'
                });
                this.stateService.removeClient(clientId);
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