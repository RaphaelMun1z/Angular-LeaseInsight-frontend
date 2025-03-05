import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; 
import { BehaviorSubject, catchError, map, Observable, take, tap, throwError } from 'rxjs';

import { AuthUserService } from './authUser.service';
import { TokenService } from './token.service';
import { LoginPayload } from '../models/commom.model';
import { DecodedToken, Token } from '../../shared/interfaces/token';
import { environment } from '../../../environments/environment';

import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = environment.api;
    
    private isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedIn.asObservable();
    
    router = inject(Router);
    tokenService = inject(TokenService);
    authUserService = inject(AuthUserService);
    messageService = inject(MessageService);
    private _http = inject(HttpClient);
    constructor() { 
        if(this.tokenService.getToken()){
            this.setLoggedIn(true);
        }
    }
    
    getLogin(payload: LoginPayload): Observable<any>{
        return this._http.post<LoginPayload>(`${this.url}/auth/login`, payload);
    }
    
    signin(payload: LoginPayload){
        return this.getLogin(payload).pipe(
            take(1),
            tap(response => {
                if(response.token && response.token.accessToken){
                    this.tokenService.setToken(response.token.accessToken);
                    this.setLoggedIn(true);
                    this.authUserService.setAuthUser();
                }
                return response;
            }),
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    setLoggedIn(status: boolean) {
        this.isLoggedIn.next(status);
    }
    
    logout(){
        this.tokenService.removeToken();
        this.authUserService.removeAuthUser();
        this.setLoggedIn(false);
        this.router.navigate(['login']);
    }
}
