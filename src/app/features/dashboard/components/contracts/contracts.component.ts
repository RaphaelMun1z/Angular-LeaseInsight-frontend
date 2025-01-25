import { Component } from '@angular/core';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { DashboardBaseComponent } from '../dashboard-base/dashboard-base.component';
import { TableContractsComponent } from "../table-contracts/table-contracts.component";

@Component({
    selector: 'app-contracts',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableContractsComponent],
    templateUrl: './contracts.component.html',
    styleUrl: './contracts.component.scss'
})

export class ContractsComponent {
    
}