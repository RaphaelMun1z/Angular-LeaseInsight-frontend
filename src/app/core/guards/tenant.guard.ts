import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthUserService } from '../services/authUser.service';
import { CurrentUser } from '../../shared/interfaces/user';

export const tenantGuard: CanActivateFn = (route, state) => {   
    const authUserService = inject(AuthUserService);
    const router = inject(Router);
        
    return new Observable<boolean>((observer) => {
        let currentUser$ = new Observable<CurrentUser | null>();
        currentUser$ = authUserService.listenToAuthUser();
        currentUser$.subscribe({
            next: (data: CurrentUser | null) => {
                if (data && data.authorities.includes("ROLE_TENANT")) {
                    observer.next(true);
                } else {
                    router.navigate(['acesso-negado']);
                    observer.next(false);
                }
                observer.complete();
            },
            error: (err: any) => {
                router.navigate(['acesso-negado']);
                observer.next(false);
                observer.complete();
            }
        });
    });
    
    return true;
};
