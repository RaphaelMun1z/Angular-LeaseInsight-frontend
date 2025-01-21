import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-navbar',
    imports: [RouterModule, Menubar, BadgeModule, SplitButton, InputTextModule, Ripple, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.scss", "./navbar-responsive.component.scss"]
})

export class NavbarComponent  implements OnInit {    
    items: MenuItem[] | undefined;
    btnOptions: MenuItem[] | undefined;
    
    constructor(private router: Router) {}
    
    ngOnInit() {
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
                command: () => {
                    this.router.navigate(['/']);
                }
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Alugar',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                        command: () => {
                            this.router.navigate(['/imoveis/alugar']);
                        }         
                    },
                    {
                        label: 'Comprar',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                        command: () => {
                            this.router.navigate(['/imoveis/comprar']);
                        }         
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Todos',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                        command: () => {
                            this.router.navigate(['/imoveis']);
                        }         
                    },
                ],
            },
            {
                label: 'Nosso time',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/nosso-time']);
                } 
            },
            {
                label: 'Contato',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/contato']);
                } 
            },
        ];
    }
}
