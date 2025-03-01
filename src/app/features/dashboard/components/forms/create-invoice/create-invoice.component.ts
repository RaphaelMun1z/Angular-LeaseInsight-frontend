import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { InvoiceCreate } from '../../../../../shared/interfaces/invoice';
import { InvoiceService } from '../../../../../core/services/invoice.service';
import { ContractStateService } from '../../../../../core/states/contract-state.service';
import { Contract } from '../../../../../shared/interfaces/contract';
import { paymentStatus } from '../../../../../shared/utils/ConstLists';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../shared/components/input/input-select/input-select.component';
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-invoice',
    imports: [FormStorageDirective, BreadcrumbComponent, FormErrorsComponent, DatePicker, InputSelectComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent implements OnInit {    
    invoiceCreateForm = new FormHandler("invoice-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Faturas', route: '/dashboard/faturas' }, { label: 'Cadastrar', route: '/dashboard/faturas/criar' }];
    protected form!: UntypedFormGroup;
    
    paymentStatus = paymentStatus;
    
    contractsSelect!: { name: string, code: string | number }[];
    protected contracts$ = new Observable<Contract[]>();
    contracts: Contract[] = [];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private invoiceService = inject(InvoiceService);
    constructor(private contractStateService: ContractStateService){
        this.contractStateService.loadContracts();
    }
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            rentalStartDate: ['', Validators.required],
            paymentStatus: ['', Validators.required],
            contractId: ['', Validators.required],
        })
        
        this.invoiceCreateForm.setForm(this.form);  
        this.getContracts();
    }
    
    getContracts(){
        this.contracts$ = this.contractStateService.listenToChanges();
        this.contracts$.subscribe((data: Contract[]) => {
            this.contractsSelect = data.map(contract => ({
                name: contract.residence ? "[" + contract.id + "] " + contract.residence?.residenceAddress.street + ", " + contract.residence?.number + " - " + contract.residence?.residenceAddress.district + " - " + contract.residence?.residenceAddress.city + " - " + contract.residence?.residenceAddress.state + " - " + contract.residence?.residenceAddress.country : "[" + contract.id + "] Imóvel excluído.",
                code: contract.id
            }));
        });
    }
    
    postForm(){
        this.invoiceCreateForm.validForm();
        const data: InvoiceCreate = this.form.value;
        console.log(JSON.stringify(data, null, 2));
        
        this.invoiceService.saveInvoice(data).subscribe({
            next: (res: any) => {    
                this.invoiceCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.invoiceCreateForm.failCaseState(errors);
            }
        });
    }
}