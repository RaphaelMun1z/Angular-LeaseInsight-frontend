import { Component } from '@angular/core';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

interface QuickAccessItem {
    label: string;
    icon: string;
    actions: any[];
    pinned: boolean;
}

@Component({
    selector: 'app-general',
    imports: [DashboardBaseComponent, CommonModule, BadgeModule, RouterModule, MenuModule, DividerModule, AvatarModule, ButtonModule, PanelModule, AccordionModule, CardModule],
    templateUrl: './general.component.html',
    styleUrl: './general.component.scss'
})

export class GeneralComponent {
    constructor(private router: Router) {}
    
    quickAccessItems: QuickAccessItem[] = [
        {
            label: 'Imóveis',
            icon: 'pi pi-home text-green-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'imoveis' },
                { label: 'Cadastrar', icon: 'pi pi-plus', route: 'imoveis/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users text-blue-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'clientes' },
                { label: 'Cadastrar', icon: 'pi pi-user-plus', route: 'clientes/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Funcionários',
            icon: 'pi pi-briefcase text-yellow-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'funcionarios' },
                { label: 'Cadastrar', icon: 'pi pi-plus', route: 'funcionarios/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Proprietários',
            icon: 'pi pi-id-card text-indigo-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'proprietarios' },
                { label: 'Cadastrar', icon: 'pi pi-plus', route: 'proprietarios/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Contratos',
            icon: 'pi pi-file text-purple-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'contratos' },
                { label: 'Cadastrar', icon: 'pi pi-plus', route: 'contratos/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Faturas',
            icon: 'pi pi-credit-card text-pink-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'faturas' },
                { label: 'Cadastrar', icon: 'pi pi-plus', route: 'faturas/cadastrar' }
            ],
            pinned: false
        },
        {
            label: 'Avisos e Notificações',
            icon: 'pi pi-bell text-orange-500',
            actions: [
                { label: 'Listar', icon: 'pi pi-list', route: 'avisos' }
            ],
            pinned: false
        },
        {
            label: 'Financeiro',
            icon: 'pi pi-wallet text-emerald-500',
            actions: [
                { label: 'Acessar', icon: 'pi pi-arrow-right', route: 'financeiro' }
            ],
            pinned: false
        },
        {
            label: 'Análise Estatística',
            icon: 'pi pi-chart-bar text-teal-500',
            actions: [
                { label: 'Acessar', icon: 'pi pi-arrow-right', route: 'analise' }
            ],
            pinned: false
        },
        {
            label: 'Suporte',
            icon: 'pi pi-question-circle text-red-500',
            actions: [
                { label: 'Abrir', icon: 'pi pi-arrow-right', route: 'suporte' }
            ],
            pinned: false
        },
        {
            label: 'Configuração',
            icon: 'pi pi-cog text-gray-600',
            actions: [
                { label: 'Ajustes', icon: 'pi pi-sliders-h', route: 'configuracoes' }
            ],
            pinned: false
        }
    ];
    
    goTo(path: string): void {
        this.router.navigate([`/${path}`]);
    }
    
    togglePin(item: QuickAccessItem) {
        item.pinned = !item.pinned;
    }
}
