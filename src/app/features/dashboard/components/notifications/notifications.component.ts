import { Component } from '@angular/core';
import { DashboardBaseComponent } from "../dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../content-block/content-block.component";

@Component({
  selector: 'app-notifications',
  imports: [DashboardBaseComponent, ContentBlockComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

}
