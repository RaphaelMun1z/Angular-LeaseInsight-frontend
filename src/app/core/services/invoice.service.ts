import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoiceCreate } from '../../shared/interfaces/invoice';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class InvoiceService { 
    private url = environment.api;
    
    constructor(private http: HttpClient) { }
    
    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.url + "/rental-histories/minimal");
    }
    
    getInvoiceById(id: string): Observable<Invoice> {
        return this.http.get<Invoice>(this.url + "/rental-histories/" + id);
    }
    
    saveInvoice(staff: InvoiceCreate): any {
        return this.http.post<InvoiceCreate>(this.url + "/rental-histories", staff);
    }
}
