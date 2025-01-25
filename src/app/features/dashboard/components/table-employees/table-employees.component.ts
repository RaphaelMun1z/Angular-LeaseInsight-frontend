import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Employee } from '../../../../shared/interfaces/employee';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-table-employees',
    imports: [FormsModule, ButtonModule, TableModule, Dialog, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, DropdownModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './table-employees.component.html',
    styleUrl: './table-employees.component.scss'
})

export class TableEmployeesComponent implements OnInit{
    employeeDialog: boolean = false; 
    @Input() employees: Employee[] = [];
    employee!: Employee;
    selectedEmployees!: Employee[] | null;
    submitted: boolean = false;
    statuses!: any[];
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}
    
    ngOnInit(): void {
        this.loadDemoData();
    }
    
    exportCSV() {
        this.dt.exportCSV();
    }
    
    loadDemoData() {
        this.cd.markForCheck();
        
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        
        this.cols = [
            { field: 'id', header: 'Code', customExportHeader: 'Employee Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    openNew() {
        this.employee =  {
            id: '',
            name: '',
            phone: '',
            email: ''
        }
        this.submitted = false;
        this.employeeDialog = true;
    }
    
    editEmployee(employee: Employee) {
        this.employee = { ...employee };
        this.employeeDialog = true;
    }
    
    deleteSelectedEmployees() {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar os employeees selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employees = this.employees.filter((val) => !this.selectedEmployees?.includes(val));
                this.selectedEmployees = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionários Deletados',
                    life: 3000
                });
            }
        });
    }
    
    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }
    
    deleteEmployee(employee: Employee) {
        this.confirmationService.confirm({
            message: 'Você tem certeza que você quer deletar ' + employee.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employees = this.employees.filter((val) => val.id !== employee.id);
                this.employee =  {
                    id: '',
                    name: '',
                    phone: '',
                    email: ''
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Deletado',
                    life: 3000
                });
            }
        });
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
            return 'success';
            case 'LOWSTOCK':
            return 'warn';
            case 'OUTOFSTOCK':
            return 'danger';
            default:
            return 'info';
        }
    }
    
    saveEmployee() {
        this.submitted = true;
        
        if (this.employee.name?.trim()) {
            if (this.employee.id) {
                this.employees[this.findIndexById(this.employee.id)] = this.employee;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Atualizado',
                    life: 3000
                });
            } else {
                this.employee.id = this.createId();
                this.employees.push(this.employee);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Operação Realizada',
                    detail: 'Funcionário Criado',
                    life: 3000
                });
            }
            
            this.employees = [...this.employees];
            this.employeeDialog = false;
            this.employee =  {
                id: '',
                name: '',
                phone: '',
                email: ''
            }
        }
    }
    
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    } 
}