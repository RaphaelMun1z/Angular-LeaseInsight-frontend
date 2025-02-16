import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginPayload } from '../models/commom.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { DecodedToken, Token } from '../../shared/interfaces/token';
import { CurrentUser } from '../../shared/interfaces/user';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = environment.api;
    private tokenName = environment.tokenName;
    
    isLoggedIn = signal<boolean>(false);
    currentUser = signal<CurrentUser | null>(null);
    
    router = inject(Router);
    messageService = inject(MessageService);
    
    constructor(private _http: HttpClient) { 
        if(this.getUserToken()){
            this.isLoggedIn.update(() => true);
        }
    }
    
    login(payload: LoginPayload){
        return this._http.post<Token>(`${this.url}/auth/login`, payload)
        .pipe(map((response) => {
            if(response.token && response.token.accessToken){
                localStorage.setItem(this.tokenName, response.token.accessToken);
                this.isLoggedIn.update(() => true);
            }
            return response;
        }));
    } 
    
    getCurrentUser(): Observable<CurrentUser>{
        return this._http.get<CurrentUser>(this.url + "/users/me");
    }
    
    getCurrentUserData(): Observable<CurrentUser> {
        return this.getCurrentUser().pipe(
            map((data: CurrentUser) => {
                return data;
            })
        );
    }
    
    removeCurrentUser() {
        this.currentUser.update(() => null);
    }
    
    getUserToken(): string | null{
        return localStorage.getItem(this.tokenName);
    }
    
    tokenExpired(token: string | null): boolean {
        if(token){
            const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return true;
    }
    
    getDecodedAccessToken(): DecodedToken | null {
        try {
            return jwtDecode(this.getUserToken() || '');
        } catch(Error) {
            return null;
        }
    }
    
    logout(){
        localStorage.removeItem(this.tokenName);
        this.removeCurrentUser();
        this.isLoggedIn.update(() => false);
        this.router.navigate(['login']);
        this.showAlert()
    }
    
    showAlert() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }
}
