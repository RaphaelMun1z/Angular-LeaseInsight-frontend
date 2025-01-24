import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-layout-dashboard',
    imports: [RouterOutlet, TieredMenu],
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
                items: [
                    {
                        label: 'Outros',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        routerLink: ['/dashboard'],
                        icon: 'pi pi-folder-open'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print'
                    }
                ]
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-home',
                routerLink: ['/dashboard/imoveis'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Financeiro',
                icon: 'pi pi-chart-line',
                routerLink: ['/dashboard/financa'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Funcionários',
                icon: 'pi pi-users',
                routerLink: ['/dashboard/funcionarios'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Clientes',
                icon: 'pi pi-users',
                routerLink: ['/dashboard/clientes'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Contratos',
                icon: 'pi pi-paperclip',
                routerLink: ['/dashboard/contratos'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Avisos e Notificações',
                icon: 'pi pi-bell',
                routerLink: ['/dashboard/notificacoes'],
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Suporte',
                routerLink: ['/dashboard/suporte'],
                icon: 'pi pi-question-circle'
            }
        ]
    }
}
