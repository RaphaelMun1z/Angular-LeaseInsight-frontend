import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Client } from '../../../../../shared/interfaces/client';
import { AuthUserService } from '../../../../../core/services/authUser.service';
import { CurrentUser } from '../../../../../shared/interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile-details-nav',
    imports: [CommonModule, ButtonModule, RouterModule],
    templateUrl: './profile-details-nav.component.html',
    styleUrl: './profile-details-nav.component.scss'
})

export class ProfileDetailsNavComponent {
    userRole!: string;
    
    private authUserService = inject(AuthUserService);
    
    ngOnInit(): void {
        this.authUserService.getAuthUser().subscribe({
            next: (user: CurrentUser | null) => {
                const client = user as Client;
                this.userRole = client.role;
            },
            error: (err) => {
                console.log("Erro! " + err);
            }
        })
    }
}
