import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileDetailsNavComponent } from '../profile-details-nav/profile-details-nav.component';

@Component({
    selector: 'app-user-profile-edit-base',
    imports: [RouterModule, ProfileDetailsNavComponent],
    templateUrl: './user-profile-edit-base.component.html',
    styleUrl: './user-profile-edit-base.component.scss'
})

export class UserProfileEditBaseComponent {
    
}
