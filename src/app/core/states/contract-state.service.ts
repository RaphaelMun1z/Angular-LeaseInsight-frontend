import { inject, Injectable } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Contract } from '../../shared/interfaces/contract';

@Injectable({
    providedIn: 'root'
})

export class ContractStateService {
    private contracts$ = new BehaviorSubject<Contract[]>([]);
    private contractService = inject(ContractService);
    
    constructor() { }
    
    loadContracts(){
        this.contractService
        .getContracts()
        .pipe(take(1))
        .subscribe(contracts => this.shareContracts(contracts))
    }
    
    private shareContracts(contracts: Contract[]){
        this.contracts$.next(contracts);
    }
    
    listenToChanges(): Observable<Contract[]>{
        return this.contracts$.asObservable();
    }
    
    addContract(contract: Contract){
        const currentContracts = this.contracts$.value;
        this.contracts$.next([...currentContracts, contract]);
    }
}
