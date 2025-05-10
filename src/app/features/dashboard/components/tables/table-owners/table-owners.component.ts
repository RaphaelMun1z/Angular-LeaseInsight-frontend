import { Component, inject, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Owner } from '../../../../../shared/interfaces/owner';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { OwnerService } from '../../../../../core/services/owner.service';
import { OwnerStateService } from '../../../../../core/states/owner-state.service';

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
    
    private service = inject(OwnerService);
    private stateService = inject(OwnerStateService);
    private messageService = inject(MessageService);
    
    deleteOwner = (ownerId: string) => {
        console.log(ownerId)
        this.service.deleteOwner(ownerId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Proprietário excluído com sucesso!'
                });
                this.stateService.removeOwner(ownerId);
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