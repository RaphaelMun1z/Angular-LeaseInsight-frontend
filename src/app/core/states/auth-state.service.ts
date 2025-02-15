import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CurrentUser } from '../../shared/interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    private authUser$ = new BehaviorSubject<CurrentUser | null>(null);
    
    private authService = inject(AuthService);
    
    loadAuthUser(){
        this.authService
        .getCurrentUser()
        .pipe(take(1))
        .subscribe(authUser => this.shareAuthUser(authUser))
    }
    
    private shareAuthUser(authUser: CurrentUser){
        this.authUser$.next(authUser);
    }
    
    listenToAuth(): Observable<CurrentUser | null>{
        return this.authUser$.asObservable();
    }
}
