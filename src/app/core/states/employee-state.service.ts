import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Employee } from '../../shared/interfaces/employee';

@Injectable({
    providedIn: 'root'
})

export class EmployeeStateService {
    private employees$ = new BehaviorSubject<Employee[]>([]);
    private employeeService = inject(EmployeeService);
    
    constructor() { }
    
    loadEmployees(){
        this.employeeService
        .getEmployees()
        .pipe(take(1))
        .subscribe(employees => this.shareEmployees(employees))
    }
    
    private shareEmployees(employees: Employee[]){
        this.employees$.next(employees);
    }
    
    listenToChanges(): Observable<Employee[]>{
        return this.employees$.asObservable();
    }
    
    addEmployee(employee: Employee){
        const currentEmployees = this.employees$.value;
        this.employees$.next([...currentEmployees, employee]);
    }
}
