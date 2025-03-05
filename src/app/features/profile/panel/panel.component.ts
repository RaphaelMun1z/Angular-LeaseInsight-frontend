import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { CurrentUser } from '../../../shared/interfaces/user';

import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthUserService } from '../../../core/services/authUser.service';

@Component({
    selector: 'app-panel',
    imports: [CommonModule, Button, MenuModule, RouterModule, BadgeModule, RippleModule, AvatarModule],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.scss'
})

export class PanelComponent implements OnInit{
    items: MenuItem[] | undefined;
    @Input() alternative: boolean = false;

    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    
    currentUserRole = signal<string|null>(null);
    
    private authUserService = inject(AuthUserService);
    private authService = inject(AuthService);
    constructor(){}
    
    ngOnInit() {        
        this.currentUser$ = this.authUserService.listenToAuthUser();
        this.currentUser$.subscribe({
            next: (data: CurrentUser | null) => {
                if (data) {
                    this.currentUser = data;
                    this.currentUserRole.update(() => data.role.toUpperCase());
                    this.updateMenuItems();
                }
            },
            error: (err: any) => {
                console.log("Erro: " + err);
            }
        });
    }
    
    updateMenuItems() {
        this.items = [
            {
                label: 'Atividade',
                items: [
                    {
                        label: 'Meus Contratos',
                        icon: 'pi pi-paperclip',
                        routerLink: '/perfil/contratos',
                        visible: this.currentUserRole() == "TENANT"
                    },
                    {
                        label: 'Minhas Propriedades',
                        icon: 'pi pi-home',
                        routerLink: '/perfil/propriedades',
                        visible: this.currentUserRole() == "OWNER"
                    },
                    {
                        label: 'Meus Relatos',
                        icon: 'pi pi-exclamation-triangle',
                        routerLink: '/perfil/relatos',
                        visible: this.currentUserRole() == "TENANT"
                    }
                ].filter(item => item.visible !== false),
            },
            {
                label: 'Financeiro',
                items: [
                    {
                        label: 'Minhas Faturas',
                        icon: 'pi pi-receipt',
                        routerLink: '/perfil/faturas',
                        visible: this.currentUserRole() == "TENANT"
                    }
                ].filter(item => item.visible !== false),
            },
            {
                label: 'Conta',
                items: [
                    {
                        label: 'Configuração',
                        icon: 'pi pi-cog',
                        routerLink: '/perfil/detalhes',
                    }
                ]
            }
        ];

        this.items = this.items.filter(item => 
            !item.items || item.items.length > 0
        );
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

    logout(){
        this.authService.logout();
    }
}
