import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, filter, map, Observable, of, take } from 'rxjs';

import { AuthUserService } from '../services/authUser.service';
import { CurrentUser } from '../../shared/interfaces/user';

export const admGuard: CanActivateFn = (route, state) => {
    const authUserService = inject(AuthUserService);
    const router = inject(Router);
    
    return authUserService.listenToAuthUser().pipe(
        filter((data): data is CurrentUser => data !== null),
        take(1),
        map((data) => {
            const isAuthorized = data.authorities.includes("ROLE_ADM");
            if (!isAuthorized) {
                router.navigate(['acesso-negado']);
            }
            return isAuthorized;
        }),
        catchError(() => {
            router.navigate(['acesso-negado']);
            return of(false);
        })
    );
};
