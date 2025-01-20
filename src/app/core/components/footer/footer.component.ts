import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-footer',
    imports: [CommonModule, RouterModule, Menu, AvatarModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})

export class FooterComponent implements OnInit {
    items: MenuItem[] | undefined;
    
    constructor(private router: Router) {}
    
    ngOnInit() {
        this.items = [
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Router Link',
                        icon: 'pi pi-palette',
                        route: '/guides/csslayer'
                    },
                    {
                        label: 'Programmatic',
                        icon: 'pi pi-link',
                        command: () => {
                            this.router.navigate(['/installation']);
                        }
                    },
                    {
                        label: 'External',
                        icon: 'pi pi-home',
                        url: 'https://angular.io//'
                    }
                ]
            }
        ];
    }
}