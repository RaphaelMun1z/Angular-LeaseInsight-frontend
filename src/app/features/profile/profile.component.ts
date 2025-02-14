import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [MenuModule, RouterModule, CommonModule, BadgeModule, RippleModule, AvatarModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent {
    items: MenuItem[] | undefined;
    
    ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Atividade',
                items: [
                    {
                        label: 'Meus Contratos',
                        icon: 'pi pi-paperclip'
                    },
                    {
                        label: 'Minhas Propriedades',
                        icon: 'pi pi-home'
                    },
                    {
                        label: 'Meus Relatos',
                        icon: 'pi pi-exclamation-triangle'
                    }
                ]
            },
            {
                label: 'Financeiro',
                items: [
                    {
                        label: 'Minhas Faturas',
                        icon: 'pi pi-receipt'
                    }
                ]
            },
            {
                label: 'Conta',
                items: [
                    {
                        label: 'Configuração',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Notificações',
                        icon: 'pi pi-inbox',
                        badge: '2'
                    },
                    {
                        label: 'Sair',
                        icon: 'pi pi-sign-out'
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }
}
