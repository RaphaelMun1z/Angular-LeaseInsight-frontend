import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {    
    const authService = inject(AuthService);
    const tokenService = inject(TokenService);
    
    let isLoggedIn = false;
    authService.isLoggedIn$.subscribe(isLogged => {
        isLoggedIn = isLogged;
    });
    if(isLoggedIn){
        if(tokenService.tokenExpired(tokenService.getToken())){
            authService.logout();
        }else{
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenService.getToken()}`,
                }
            });
        }
    }
    
    return next(req).pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => {
            if(e.status === 401){
                authService.logout();
            } 
            
            const error = e.error;
            return throwError(() => error);
        })
    );
};
