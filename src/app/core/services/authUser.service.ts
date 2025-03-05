import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CurrentUser } from '../../shared/interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthUserService {
    private url = environment.api;
    
    private authUser$ = new BehaviorSubject<CurrentUser | null>(null);
    authUser = signal<CurrentUser | null>(null);
    
    private _http = inject(HttpClient);
    constructor() { }
    
    getAuthUser(): Observable<CurrentUser>{
        return this._http.get<CurrentUser>(this.url + "/users/me");
    }
    
    // Set Auth User
    setAuthUser(): void {
        this.getAuthUser().pipe(
            take(1),
            tap(user => {
                this.shareAuthUser(user)
            }),
            catchError(error => {
                return throwError(() => error);
            })
        ).subscribe();
    }
    
    private shareAuthUser(authUser: CurrentUser){
        this.authUser$.next(authUser);
    }
    
    // Listen To Auth User
    listenToAuthUser(): Observable<CurrentUser | null>{
        return this.authUser$.asObservable();
    }
    
    removeAuthUser() {
        this.authUser$.next(null);
        this.authUser.update(() => null);
    }
}
