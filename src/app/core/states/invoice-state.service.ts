import { inject, Injectable } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Invoice } from '../../shared/interfaces/invoice';

@Injectable({
    providedIn: 'root'
})

export class InvoiceStateService {
    private invoices$ = new BehaviorSubject<Invoice[]>([]);
    private invoiceService = inject(InvoiceService);
    
    constructor() { }
    
    loadInvoices(){
        this.invoiceService
        .getInvoices()
        .pipe(take(1))
        .subscribe(invoices => this.shareInvoices(invoices))
    }
    
    private shareInvoices(invoices: Invoice[]){
        this.invoices$.next(invoices);
    }
    
    listenToChanges(): Observable<Invoice[]>{
        return this.invoices$.asObservable();
    }
    
    addInvoice(invoice: Invoice){
        const currentInvoices = this.invoices$.value;
        this.invoices$.next([...currentInvoices, invoice]);
    }
}
