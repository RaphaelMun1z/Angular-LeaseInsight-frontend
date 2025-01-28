import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CEP } from '../../shared/interfaces/cep';

@Injectable({
    providedIn: 'root'
})

export class CepService { 
    constructor(private http: HttpClient) { }
    
    getAddressByCep(cep: string): Observable<CEP> {
        return this.http.get<CEP>(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
