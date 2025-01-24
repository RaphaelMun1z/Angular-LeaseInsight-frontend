import { Component } from '@angular/core';
import { DashboardBaseComponent } from "../dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../content-block/content-block.component";

@Component({
  selector: 'app-suport',
  imports: [DashboardBaseComponent, ContentBlockComponent],
  templateUrl: './suport.component.html',
  styleUrl: './suport.component.scss'
})
export class SuportComponent {

}
