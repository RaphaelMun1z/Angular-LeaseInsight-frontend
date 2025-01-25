import { Component } from '@angular/core';
import { ContentBlockComponent } from '../content-block/content-block.component';
import { DashboardBaseComponent } from '../dashboard-base/dashboard-base.component';
import { TableEmployeesComponent } from "../table-employees/table-employees.component";

@Component({
    selector: 'app-employees',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableEmployeesComponent],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss'
})

export class EmployeesComponent {

}