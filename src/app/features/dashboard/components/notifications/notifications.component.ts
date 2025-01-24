import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBaseComponent } from "../dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../content-block/content-block.component";
import { TabComponent } from "./components/tab/tab.component";

@Component({
    selector: 'app-notifications',
    imports: [RouterModule, DashboardBaseComponent, ContentBlockComponent, TabComponent],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.scss'
})

export class NotificationsComponent {
   
}
