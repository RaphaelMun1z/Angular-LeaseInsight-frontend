import { Component, effect, Injector, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})

export class LayoutComponent implements OnInit{
    authService = inject(AuthService); 
    injector = inject(Injector);
    isLoggedIn = false;
    
    ngOnInit(): void {
        this.authService.isLoggedIn$.subscribe(isLogged => {
            this.isLoggedIn = isLogged;
        });
    }
}
