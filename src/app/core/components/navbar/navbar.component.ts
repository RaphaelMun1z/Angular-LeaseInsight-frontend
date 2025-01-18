import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-navbar',
    imports: [Menubar, BadgeModule, SplitButton, InputTextModule, Ripple, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})

export class NavbarComponent  implements OnInit {    
    items: MenuItem[] | undefined;
    btnOptions: MenuItem[] | undefined;
    
    ngOnInit() {
        this.btnOptions = [
            {
                label: 'Anunciar',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Acompanhar',
                icon: 'pi pi-times'
            }
        ];
        
        this.items = [
            {
                label: 'Menu',
                icon: 'pi pi-home',
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Alugar',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                    },
                    {
                        label: 'Comprar',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Todos',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                    },
                ],
            },
            {
                label: 'Nosso time',
                icon: 'pi pi-home',
            },
            {
                label: 'Contato',
                icon: 'pi pi-home',
            },
        ];
    }
}
