import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    imports: [CommonModule, RouterModule, Breadcrumb],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})

export class BreadcrumbComponent{
    @Input() breadCrumbItems: MenuItem[] | undefined;
}
