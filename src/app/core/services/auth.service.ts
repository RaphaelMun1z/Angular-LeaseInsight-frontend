import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse, LoginPayload, User } from '../models/commom.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = environment.api;
    private tokenName = environment.tokenName;
    
    isLoggedIn = signal<boolean>(false);
    router = inject(Router);
    
    constructor(private _http: HttpClient) { 
        if(this.getUserToken()){
            this.isLoggedIn.update(() => true);
        }
    }
    
    login(payload: LoginPayload){
        return this._http.post<ApiResponse<User>>(`${this.url}/auth/login`, payload)
        .pipe(map((response) => {
            if(response.token){
                localStorage.setItem(this.tokenName, response.token);
                this.isLoggedIn.update(() => true);
            }
            return response;
        }));
    }
    
    me(){
        return this._http.get<ApiResponse<User>>(`${this.url}/auth/me`);
    }
    
    getUserToken(){
        return localStorage.getItem(this.tokenName);
    }
    
    logout(){
        localStorage.removeItem(this.tokenName);
        this.isLoggedIn.update(() => false);
        this.router.navigate(['login']);
    }
}
