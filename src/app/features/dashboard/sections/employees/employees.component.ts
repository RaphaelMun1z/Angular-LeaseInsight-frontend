import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeStateService } from '../../../../core/states/employee-state.service';
import { Employee } from '../../../../shared/interfaces/employee';

import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { TableEmployeesComponent } from '../../components/tables/table-employees/table-employees.component';

@Component({
    selector: 'app-employees',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableEmployeesComponent],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss'
})

export class EmployeesComponent implements OnInit {
    protected employees$ = new Observable<Employee[]>();
    employees : Employee[] = [];
    
    constructor(private employeeStateService: EmployeeStateService){
        this.employeeStateService.loadEmployees();
    }
    
    ngOnInit(): void {
        this.employees$ = this.employeeStateService.listenToEmployeesChanges();
        this.employees$.subscribe((data: Employee[]) => {
            this.employees = data;
        });
    }
}