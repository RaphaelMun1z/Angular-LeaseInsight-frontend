import { inject, Injectable } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { Contract } from '../../shared/interfaces/contract';

@Injectable({
    providedIn: 'root'
})

export class ContractStateService {
    private contracts$ = new BehaviorSubject<Contract[]>([]);
    
    private contractService = inject(ContractService);
    
    // Get All
    loadContracts(){
        this.contractService
        .getContracts()
        .pipe(take(1))
        .subscribe(contracts => this.shareContracts(contracts))
    }
    
    private shareContracts(contracts: Contract[]){
        this.contracts$.next(contracts);
    }
    
    listenToContractsChanges(): Observable<Contract[]>{
        return this.contracts$.asObservable();
    }
    
    // Get By Id
    loadContract(id: string): Observable<Contract | null> {
        return this.contractService.getContractById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Contract
    addContract(contract: Contract){
        const currentContracts = this.contracts$.value;
        this.contracts$.next([...currentContracts, contract]);
    }
    
    // Remove Contract
    removeContract(id: string) {
        const currentContracts = this.contracts$.value;
        const updatedContracts = currentContracts.filter(p => p.id !== id);
        this.contracts$.next(updatedContracts);
    }
}
