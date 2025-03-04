import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ContractStateService } from '../../../../core/states/contract-state.service';
import { Contract } from '../../../../shared/interfaces/contract';

import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { TableContractsComponent } from '../../components/tables/table-contracts/table-contracts.component';

@Component({
    selector: 'app-contracts',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableContractsComponent],
    templateUrl: './contracts.component.html',
    styleUrl: './contracts.component.scss'
})

export class ContractsComponent implements OnInit {
    protected contracts$ = new Observable<Contract[]>();
    contracts : Contract[] = [];
    
    constructor(private contractStateService: ContractStateService){
        this.contractStateService.loadContracts();
    }
    
    ngOnInit(): void {
        this.contracts$ = this.contractStateService.listenToContractsChanges();
        this.contracts$.subscribe((data: Contract[]) => {
            this.contracts = data;
        });
    }
}