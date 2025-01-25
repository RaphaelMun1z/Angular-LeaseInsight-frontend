import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../shared/interfaces/employee';
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
}
