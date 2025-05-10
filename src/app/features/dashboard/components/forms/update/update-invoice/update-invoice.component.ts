import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InvoiceStateService } from '../../../../../../core/states/invoice-state.service';
import { InvoiceService } from '../../../../../../core/services/invoice.service';
import { Invoice, InvoiceUpdate } from '../../../../../../shared/interfaces/invoice';
import { paymentStatus } from '../../../../../../shared/utils/ConstLists';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { BreadcrumbComponent } from '../../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-update-invoice',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-invoice.component.html',
    styleUrl: './update-invoice.component.scss'
})

export class UpdateInvoiceComponent implements OnInit {
    invoiceUpdateForm = new FormHandler("invoice-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Proprietários', route: '/dashboard/faturas' }, { label: 'Atualizar', route: '/dashboard/faturas/atualizar' }];
    protected form!: UntypedFormGroup;
    
    paymentStatus = paymentStatus;
    currentId!: string;
    invoice! : Invoice;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private invoiceService = inject(InvoiceService);
    private invoiceStateService = inject(InvoiceStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.invoiceStateService.loadInvoice(this.currentId).subscribe({
                next: (invoice: Invoice | null) => {
                    if(invoice){
                        this.form.patchValue({
                            paymentStatus: invoice.paymentStatus
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/faturas']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            paymentStatus: [''],
        })
        this.invoiceUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.invoiceUpdateForm.validForm();
        const data: InvoiceUpdate = this.form.value;
        this.invoiceService.patchInvoice(data, this.currentId).subscribe({
            next: (res: any) => {    
                console.log(data);
                this.invoiceUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/faturas']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.invoiceUpdateForm.failCaseState(errors);
            }
        });
    }
}