import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { AsideComponent } from "./components/aside/aside.component";

@Component({
    selector: 'app-layout-dashboard',
    imports: [RouterOutlet, AsideComponent],
    templateUrl: './layout-dashboard.component.html',
    styleUrl: './layout-dashboard.component.scss'
})

export class LayoutDashboardComponent implements OnInit {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-objects-column',
                routerLink: ['/dashboard'],
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-home',
                routerLink: ['/dashboard/imoveis'],
            },
            {
                label: 'Financeiro',
                icon: 'pi pi-chart-line',
                routerLink: ['/dashboard/financa'],
            },
            {
                label: 'Funcionários',
                icon: 'pi pi-users',
                routerLink: ['/dashboard/funcionarios'],
            },
            {
                label: 'Clientes',
                icon: 'pi pi-users',
                items: [
                    {
                        icon: 'pi pi-list-check',
                        label: 'Listar',
                        routerLink: ['/dashboard/clientes'],
                    },
                    {
                        icon: 'pi pi-plus',
                        label: 'Criar',
                        routerLink: ['/dashboard/clientes/criar'],
                    },
                ]
            },
            {
                label: 'Contratos',
                icon: 'pi pi-paperclip',
                routerLink: ['/dashboard/contratos'],
            },
            {
                label: 'Avisos e Notificações',
                icon: 'pi pi-bell',
                routerLink: ['/dashboard/notificacoes'],
            },
            {
                label: 'Suporte',
                routerLink: ['/dashboard/suporte'],
                icon: 'pi pi-question-circle'
            },
            {
                label: 'Home',
                routerLink: ['/'],
                icon: 'pi pi-home'
            }
        ]
    }
}
