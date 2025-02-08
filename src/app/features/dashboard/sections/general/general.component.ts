import { Component } from '@angular/core';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { ChartComponent } from '../../components/chart/chart.component';

@Component({
  selector: 'app-general',
  imports: [DashboardBaseComponent, ContentBlockComponent, ChartComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})

export class GeneralComponent {

}
