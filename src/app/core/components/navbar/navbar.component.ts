import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { AuthUserService } from '../../services/authUser.service';
import { CurrentUser } from '../../../shared/interfaces/user';
import { PanelComponent } from '../../../features/profile/panel/panel.component';

import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MegaMenu } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuItem } from 'primeng/api';

@Component({
    selector: 'app-navbar',
    imports: [DrawerModule, PanelComponent, ButtonModule, MegaMenu, RouterModule, AvatarModule, BadgeModule, InputTextModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.scss", "./navbar-responsive.component.scss"]
})

export class NavbarComponent implements OnInit {  
    @Input() authService : any; 
    @Input() isLoggedIn : any;
    
    visible: boolean = false;
    items: MegaMenuItem[] | undefined;
    
    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    currentUserRole = signal<string|null>(null);
    
    private authUserService = inject(AuthUserService);
    constructor() {}
    
    ngOnInit() {
        this.currentUser$ = this.authUserService.listenToAuthUser();
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
        
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                route: '/'
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-building',
                route: '/imoveis',
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
