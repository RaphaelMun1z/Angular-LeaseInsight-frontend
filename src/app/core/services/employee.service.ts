import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeCreate, EmployeeUpdate } from '../../shared/interfaces/employee';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.url + "/staffs");
    }
    
    getEmployeeById(id: string): Observable<Employee> {
        return this.http.get<Employee>(this.url + "/staffs/" + id);
    }
    
    saveEmployee(staff: EmployeeCreate): any {
        return this.http.post<EmployeeCreate>(this.url + "/staffs", staff);
    }
    
    patchEmployee(employee: EmployeeUpdate, id: string): any {
        return this.http.patch<EmployeeUpdate>(this.url + "/staffs/" + id, employee);
    }
}
