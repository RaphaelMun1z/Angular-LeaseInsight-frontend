import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CurrentUser } from '../../shared/interfaces/user';
import { Observable, of } from 'rxjs';

export const staffGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
        
    return new Observable<boolean>((observer) => {
        authService.getCurrentUserData().subscribe({
            next: (data: CurrentUser | null) => {
                if (data && data.authorities.includes("ROLE_STAFF")) {
                    observer.next(true);
                } else {
                    router.navigate(['acesso-negado']);
                    observer.next(false);
                }
                observer.complete();
            },
            error: (err: any) => {
                console.log("Erro: " + err);
                router.navigate(['acesso-negado']);
                observer.next(false);
                observer.complete();
            }
        });
    });
    
    return true;
};
