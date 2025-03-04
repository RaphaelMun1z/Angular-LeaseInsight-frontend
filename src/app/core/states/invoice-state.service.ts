import { inject, Injectable } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { BehaviorSubject, catchError, Observable, take, throwError } from 'rxjs';
import { Invoice } from '../../shared/interfaces/invoice';

@Injectable({
    providedIn: 'root'
})

export class InvoiceStateService {
    private invoices$ = new BehaviorSubject<Invoice[]>([]);
    
    private invoiceService = inject(InvoiceService);
    constructor() { }
    
    // Get All
    loadInvoices(){
        this.invoiceService
        .getInvoices()
        .pipe(take(1))
        .subscribe(invoices => this.shareInvoices(invoices))
    }
    
    private shareInvoices(invoices: Invoice[]){
        this.invoices$.next(invoices);
    }
    
    listenToInvoicesChanges(): Observable<Invoice[]>{
        return this.invoices$.asObservable();
    }
    
    // Get By Id
    loadInvoice(id: string): Observable<Invoice | null> {
        return this.invoiceService.getInvoiceById(id).pipe(
            take(1), 
            catchError(error => {
                return throwError(() => error);
            })
        );
    }
    
    // Add Invoice
    addInvoice(invoice: Invoice){
        const currentInvoices = this.invoices$.value;
        this.invoices$.next([...currentInvoices, invoice]);
    }
}
