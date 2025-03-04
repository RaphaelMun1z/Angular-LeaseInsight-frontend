import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract, ContractCreate, ContractUpdate } from '../../shared/interfaces/contract';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ContractService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getContracts(): Observable<Contract[]> {
        return this.http.get<Contract[]>(this.url + "/contracts");
    }
    
    getContractById(id: string): Observable<Contract> {
        return this.http.get<Contract>(this.url + "/contracts/" + id);
    }
    
    saveContract(staff: ContractCreate): any {
        return this.http.post<Contract>(this.url + "/contracts", staff);
    }
    
    patchContract(contract: ContractUpdate, id: string): any {
        return this.http.patch<ContractUpdate>(this.url + "/contracts/" + id, contract);
    }
}
