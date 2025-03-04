import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { InvoiceStateService } from '../../../../core/states/invoice-state.service';
import { Invoice } from '../../../../shared/interfaces/invoice';

import { ContentBlockComponent } from '../../components/content-block/content-block.component';
import { DashboardBaseComponent } from '../../components/dashboard-base/dashboard-base.component';
import { TableInvoicesComponent } from '../../components/tables/table-invoices/table-invoices.component';

@Component({
    selector: 'app-invoices',
    imports: [ContentBlockComponent, DashboardBaseComponent, TableInvoicesComponent],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})

export class InvoicesComponent implements OnInit {
    protected invoices$ = new Observable<Invoice[]>();
    invoices : Invoice[] = [];
    
    constructor(private invoiceStateService: InvoiceStateService){
        this.invoiceStateService.loadInvoices();
    }
    
    ngOnInit(): void {
        this.invoices$ = this.invoiceStateService.listenToInvoicesChanges();
        this.invoices$.subscribe((data: Invoice[]) => {
            this.invoices = data;
        });
    }
}
