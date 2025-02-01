import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorResponse } from '../../shared/interfaces/errorResponse';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenName = environment.tokenName;
    
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if(authService.isLoggedIn()){
        if(authService.tokenExpired(authService.getUserToken())){
            authService.logout();
        }else{    
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authService.getUserToken()}`,
                }
            });
        }
    }
    
    return next(req).pipe(
        retry(2),
        catchError((e: HttpErrorResponse) => {
            if(e.status === 401){
                localStorage.removeItem(tokenName);
                router.navigate(['login']);
            }
            
            const error = e.error;
            return throwError(() => error);
        })
    );
};
