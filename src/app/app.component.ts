import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { AuthUserService } from './core/services/authUser.service';
import { AuthService } from './core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [MessageService]
})

export class AppComponent implements OnInit{
    private authUserService = inject(AuthUserService);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    
    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe(isLogged => {
            if(isLogged){
                this.authUserService.setAuthUser();
            }
        });
    }
}
