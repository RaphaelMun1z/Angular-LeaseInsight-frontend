import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-navbar',
    imports: [DrawerModule, ButtonModule, MegaMenu, RouterModule, AvatarModule, BadgeModule, SplitButton, InputTextModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ["./navbar.component.scss", "./navbar-responsive.component.scss"]
})

export class NavbarComponent implements OnInit {  
    @Input() authService : any; 
    @Input() isLoggedIn : any;
    
    visible: boolean = false;
    items: MegaMenuItem[] | undefined;
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
                items: [
                    [
                        {
                            label: 'Living Room',
                            items: [
                                { label: 'Accessories' },
                                { label: 'Armchair' },
                                { label: 'Coffee Table' },
                                { label: 'Couch' },
                                { label: 'TV Stand' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Kitchen',
                            items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }],
                        },
                        {
                            label: 'Bathroom',
                            items: [{ label: 'Accessories' }],
                        },
                    ],
                    [
                        {
                            label: 'Bedroom',
                            items: [
                                { label: 'Bed' },
                                { label: 'Chaise lounge' },
                                { label: 'Cupboard' },
                                { label: 'Dresser' },
                                { label: 'Wardrobe' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Office',
                            items: [
                                { label: 'Bookcase' },
                                { label: 'Cabinet' },
                                { label: 'Chair' },
                                { label: 'Desk' },
                                { label: 'Executive Chair' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Imóveis',
                icon: 'pi pi-search',
                items: [
                    [
                        {
                            label: 'Computer',
                            items: [
                                { label: 'Monitor' },
                                { label: 'Mouse' },
                                { label: 'Notebook' },
                                { label: 'Keyboard' },
                                { label: 'Printer' },
                                { label: 'Storage' },
                            ],
                        },
                    ],
                    [
                        {
                            label: 'Home Theater',
                            items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }],
                        },
                    ],
                    [
                        {
                            label: 'Gaming',
                            items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }],
                        },
                    ],
                    [
                        {
                            label: 'Appliances',
                            items: [
                                { label: 'Coffee Machine' },
                                { label: 'Fridge' },
                                { label: 'Oven' },
                                { label: 'Vaccum Cleaner' },
                                { label: 'Washing Machine' },
                            ],
                        },
                    ],
                ],
            },
            {
                label: 'Nosso time',
                icon: 'pi pi-users',
                items: [
                    [
                        {
                            label: 'Football',
                            items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }],
                        },
                    ],
                    [
                        {
                            label: 'Running',
                            items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }],
                        },
                    ],
                    [
                        {
                            label: 'Swimming',
                            items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }],
                        },
                    ],
                    [
                        {
                            label: 'Tennis',
                            items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }],
                        },
                    ],
                ],
            },
            {
                label: 'Contato',
                icon: 'pi pi-phone',
                items: []
            }
        ];
    }
    
    logout(){
        this.authService.logout();
    }
}
