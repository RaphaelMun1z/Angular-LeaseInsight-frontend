import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../components/content-block/content-block.component';

@Component({
    selector: 'app-suport',
    imports: [DashboardBaseComponent, ContentBlockComponent, CommonModule, TabsModule],
    templateUrl: './suport.component.html',
    styleUrl: './suport.component.scss'
})

export class SuportComponent {
    activeIndex: number = 0;
    
    scrollableTabs: any[] = Array.from({ length: 5 }, (_, i) => ({ title: "Title", content: "Content" }));
}
