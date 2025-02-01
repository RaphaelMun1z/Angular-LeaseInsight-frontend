import { Component, OnInit } from '@angular/core';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { DashboardBaseComponent } from '../dashboard-base/dashboard-base.component';
import { TableEmployeesComponent } from "../views/table-employees/table-employees.component";
import { Employee } from '../../../../shared/interfaces/employee';
import { Observable } from 'rxjs';
import { EmployeeStateService } from '../../../../core/states/employee-state.service';

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
        this.employeeStateService.loadEmployeees();
    }
    
    ngOnInit(): void {
        this.getEmployees();
        this.employees$.subscribe((data: Employee[]) => {
            this.employees = data;
        });
    }
    
    getEmployees(){
        this.employees$ = this.employeeStateService.listenToChanges();
    }
}