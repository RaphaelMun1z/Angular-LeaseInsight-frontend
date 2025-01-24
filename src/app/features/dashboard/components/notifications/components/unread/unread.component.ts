import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-unread',
    imports: [PanelModule, AvatarModule, ButtonModule, MenuModule, CommonModule],
    templateUrl: './unread.component.html',
    styleUrl: './unread.component.scss'
})

export class UnreadComponent implements OnInit {
    items: { label?: string; icon?: string; separator?: boolean }[] = [];
    
    ngOnInit() {
        this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }
}