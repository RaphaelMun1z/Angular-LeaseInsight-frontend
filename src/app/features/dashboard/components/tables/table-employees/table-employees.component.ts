import { Component, inject, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { Employee } from '../../../../../shared/interfaces/employee';
import { take } from 'rxjs';
import { EmployeeService } from '../../../../../core/services/employee.service';
import { EmployeeStateService } from '../../../../../core/states/employee-state.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-employees',
    imports: [TableComponent],
    providers: [ConfirmationService],
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
    
    private service = inject(EmployeeService);
    private stateService = inject(EmployeeStateService);
    private messageService = inject(MessageService);
    
    deleteEmployee = (employeeId: string) => {
        console.log(employeeId)
        this.service.deleteEmployee(employeeId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Funcionário excluído com sucesso!'
                });
                this.stateService.removeEmployee(employeeId);
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