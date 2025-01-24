import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { RouterModule } from '@angular/router';

interface tab {
    label: string,
    icon: string,
    route: string,
}

@Component({
    selector: 'app-tab',
    imports: [CommonModule, RouterModule, TabsModule],
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss'
})

export class TabComponent implements OnInit{
    tabs: tab[] = [];
    
    ngOnInit(): void {
        this.tabs = [
            {
                label: 'Lidos',
                icon: 'pi pi-eye',
                route: 'lidos'
            },
            {
                label: 'Não lidos',
                icon: 'pi pi-bell',
                route: 'nao-lidos'
            }
        ]
    }  
}
