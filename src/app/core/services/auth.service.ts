import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse, LoginPayload, User } from '../models/commom.model';
import { ApiEndpoint, LocalStorage } from '../config/constants';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn = signal<boolean>(false);
    router = inject(Router);

    constructor(private _http: HttpClient) { 
        if(this.getUserToken()){
            this.isLoggedIn.update(() => true);
        }
    }
    
    login(payload: LoginPayload){
        return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Login}`, payload)
        .pipe(map((response) => {
            if(response.token){
                localStorage.setItem(LocalStorage.token, response.token);
                this.isLoggedIn.update(() => true);
            }
            return response;
        }));
    }
    
    me(){
        return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.Me}`);
    }
    
    getUserToken(){
        return localStorage.getItem(LocalStorage.token)? true : false;
    }
    
    logout(){
        localStorage.removeItem(LocalStorage.token);
        this.isLoggedIn.update(() => false);
        this.router.navigate(['login']);
    }
}
