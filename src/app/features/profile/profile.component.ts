import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../shared/interfaces/user';
import { AuthStateService } from '../../core/states/auth-state.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, RouterOutlet, MenuModule, RouterModule, CommonModule, BadgeModule, RippleModule, AvatarModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit{
    items: MenuItem[] | undefined;
    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    
    constructor(private authStateService: AuthStateService){
        this.authStateService.loadAuthUser();
    }
    
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
                        icon: 'pi pi-paperclip',
                        routerLink: 'faturas',
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
                        icon: 'pi pi-cog',
                        routerLink: ['/perfil/detalhes'],
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
        
        this.authStateService.loadAuthUser();
        this.getCurrentUser();
        this.currentUser$.subscribe({
            next: (data: CurrentUser | null) => {
                if (data) {
                    this.currentUser = data;
                }
            },
            error: (err: any) => {
                console.log("Erro: " + err);
            }
        });
    }
    
    getCurrentUser(){
        this.currentUser$ = this.authStateService.listenToAuth();
    }
    
    getRole(role: string){
        switch (role) {
            case "adm":
            return "Administrador";
            case "staff":
            return "Colaborador";
            case "owner":
            return "Proprietário";
            case "tenant":
            return "Inquilino";
            default:
            return "Não foi possível carregar!"
        }
    }
}
