import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dashboard-base',
    imports: [],
    templateUrl: './dashboard-base.component.html',
    styleUrl: './dashboard-base.component.scss'
})

export class DashboardBaseComponent {
    @Input() title!: string;
}
