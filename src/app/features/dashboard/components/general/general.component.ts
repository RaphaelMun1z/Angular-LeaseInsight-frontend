import { Component } from '@angular/core';
import { DashboardBaseComponent } from "../dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../content-block/content-block.component";
import { ChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-general',
  imports: [DashboardBaseComponent, ContentBlockComponent, ChartComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})

export class GeneralComponent {

}
