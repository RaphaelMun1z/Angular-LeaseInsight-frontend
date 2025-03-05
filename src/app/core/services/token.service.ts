import { Injectable } from "@angular/core";

import { environment } from "../../../environments/environment";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../shared/interfaces/token";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    private tokenName = environment.tokenName;
    
    getToken(): string | null {
        return localStorage.getItem(this.tokenName);
    }
    
    setToken(token: string): void {
        localStorage.setItem(this.tokenName, token);
    }
    
    removeToken(): void {
        localStorage.removeItem(this.tokenName);
    }

    getDecodedAccessToken(): DecodedToken | null {
        try {
            return jwtDecode(this.getToken() || '');
        } catch(Error) {
            return null;
        }
    }

    tokenExpired(token: string | null): boolean {
        if(token){
            const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return true;
    }
}
