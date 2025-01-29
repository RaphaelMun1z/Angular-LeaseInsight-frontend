import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { RouterModule } from '@angular/router';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';

@Component({
    selector: 'app-create-contract',
    imports: [StepsModule, RouterModule, DashboardBaseComponent, ContentBlockComponent],
    templateUrl: './create-contract.component.html',
    styleUrl: './create-contract.component.scss'
})

export class CreateContractComponent  implements OnInit {    
    items!: MenuItem[];
    
    ngOnInit() {
        this.items = [
            {
                label: 'Selecionar Imóvel',
                routerLink: 'selecionar-imovel'
            },
            {
                label: 'Selecionar Cliente',
                routerLink: 'selecionar-cliente'
            },
            {
                label: 'Detalhes',
                routerLink: 'detalhes'
            },
            {
                label: 'Confirmação',
                routerLink: 'confirmacao'
            }
        ];
    }
}