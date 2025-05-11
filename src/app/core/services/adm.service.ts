import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { AuthUserService } from './authUser.service';
import { Owner, OwnerCreate, OwnerUpdate } from '../../shared/interfaces/owner';
import { Property } from '../../shared/interfaces/property';
import { environment } from '../../../environments/environment';
import { AdmUpdate } from '../../shared/interfaces/adm';

@Injectable({
    providedIn: 'root'
})

export class AdmService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }

    patchAdm(adm: AdmUpdate, id: string): any {
        return this.http.patch<AdmUpdate>(this.url + "/adm/" + id, adm);
    }
}
