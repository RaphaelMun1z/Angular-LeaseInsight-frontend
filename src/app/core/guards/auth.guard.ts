import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    let isLoggedIn = false;
    
    authService.isLoggedIn$.subscribe(isLogged => {
        isLoggedIn = isLogged;
    });

    if(!isLoggedIn){
        router.navigate(['login'])
        return of(false);
    }
    
    return true;
};
