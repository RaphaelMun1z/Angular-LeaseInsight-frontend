import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { PanelComponent } from '../../../features/profile/panel/panel.component';
import { AuthStateService } from '../../states/auth-state.service';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../../shared/interfaces/user';

@Component({
    selector: 'app-navbar',
    imports: [DrawerModule, PanelComponent, ButtonModule, MegaMenu, RouterModule, AvatarModule, BadgeModule, SplitButton, InputTextModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.scss", "./navbar-responsive.component.scss"]
})

export class NavbarComponent implements OnInit {  
    @Input() authService : any; 
    @Input() isLoggedIn : any;
    
    visible: boolean = false;
    items: MegaMenuItem[] | undefined;
    btnOptions: MenuItem[] | undefined;
    
    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    currentUserRole = signal<string|null>(null);
    
    constructor(private authStateService: AuthStateService, private router: Router) {
        this.authStateService.loadAuthUser();
    }
    
    ngOnInit() {
        this.authStateService.loadAuthUser();
        this.getCurrentUser();
        this.currentUser$.subscribe({
            next: (data: CurrentUser | null) => {
                if (data) {
                    this.currentUser = data;
                    this.currentUserRole.update(() => data.role.toUpperCase());
                }
            },
            error: (err: any) => {
                console.log("Erro: " + err);
            }
        });
        
        this.btnOptions = [
            {
                label: 'Anunciar',
                icon: 'pi pi-megaphone',
                routerLink: ['/anunciar']
            },
            {
                label: 'Acompanhar',
                icon: 'pi pi-inbox',
                routerLink: ['/acompanhar']
            }
        ];
        
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                route: '/'
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-building',
                items: [
                    [
                        {
                            label: 'Busque pelo imóvel ideal para você',
                            items: [
                                { label: 'Casa' },
                                { label: 'Apartamento' },
                                { label: 'Condomínio' },
                                { label: 'Apartamento Comercial' },
                                { label: 'Fazenda' },
                                { label: 'Terreno' },
                                { label: 'Loja' },
                                { label: 'Armazém' },
                                { label: 'Galpão' },
                                { label: 'Outro' },
                            ],
                        },
                    ]
                ],
            },
            {
                label: 'Nosso time',
                icon: 'pi pi-users',
                route: 'nosso-time'
            },
            {
                label: 'Contato',
                icon: 'pi pi-phone',
                route: 'contato'
            }
        ];
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
    
    logout(){
        this.authService.logout();
    }
}
