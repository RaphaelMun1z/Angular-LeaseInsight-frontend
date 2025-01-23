import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayload, User } from '../models/commom.model';
import { ApiEndpoint, LocalStorage } from '../config/constants';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private _http: HttpClient) { }
    
    login(payload: LoginPayload){
        return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Login}`, payload)
        .pipe(map((response) => {
            if(response.status && response.token){
                localStorage.setItem(LocalStorage.token, response.token);
            }
            return response;
        }));
    }
    
    me(){
        return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.Me}`);
    }
}
