import { inject, Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { Employee } from '../../shared/interfaces/employee';

@Injectable({
    providedIn: 'root'
})

export class EmployeeStateService {
    private employees$ = new BehaviorSubject<Employee[]>([]);
    
    private employeeService = inject(EmployeeService);
    constructor() { }
    
    // Get All
    loadEmployees(){
        this.employeeService
        .getEmployees()
        .pipe(take(1))
        .subscribe(employees => this.shareEmployees(employees))
    }
    
    private shareEmployees(employees: Employee[]){
        this.employees$.next(employees);
    }
    
    listenToEmployeesChanges(): Observable<Employee[]>{
        return this.employees$.asObservable();
    }
    
    // Get By Id
    loadEmployee(id: string): Observable<Employee | null> {
        return this.employeeService.getEmployeeById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Employee
    addEmployee(employee: Employee){
        const currentEmployees = this.employees$.value;
        this.employees$.next([...currentEmployees, employee]);
    }
}
