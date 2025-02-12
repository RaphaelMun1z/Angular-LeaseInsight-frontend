import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';

import { InvoiceCreate } from '../../../../../shared/interfaces/invoice';
import { InvoiceService } from '../../../../../core/services/invoice.service';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Breadcrumb } from 'primeng/breadcrumb';
import { InputMask } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { MenuItem } from 'primeng/api';
import { InputSelectComponent } from '../../../../../shared/components/input/input-select/input-select.component';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { DatePicker } from 'primeng/datepicker';
import { Contract } from '../../../../../shared/interfaces/contract';
import { Observable } from 'rxjs';
import { ContractStateService } from '../../../../../core/states/contract-state.service';

@Component({
    selector: 'app-create-invoice',
    imports: [RouterModule, FormStorageDirective, DatePicker, Breadcrumb, InputSelectComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, InputMask, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent implements OnInit {    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;

    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    paymentStatus!: { name: string, code: string | number }[];
    contractsSelect!: { name: string, code: string | number }[];
    protected contracts$ = new Observable<Contract[]>();
    contracts: Contract[] = [];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private invoiceService = inject(InvoiceService);
    constructor(private contractStateService: ContractStateService){
        this.contractStateService.loadContracts();
    }
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        
        this.items = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Faturas', route: '/dashboard/faturas' }, { label: 'Cadastrar', route: '/dashboard/faturas/criar' }];
        this.paymentStatus = [
            { name: "Pendente", code: 1 },
            { name: "Pago", code: 2 },
            { name: "Vencido", code: 3 },
            { name: "Cancelado", code: 4 },
            { name: "Em processo", code: 5 },
            { name: "Pago parcialmente", code: 6 },
            { name: "Em disputa", code: 7 },
            { name: "Reembolsado", code: 8 },
            { name: "Em cobrança", code: 9 }
        ]
        
        this.getContracts();
        this.contracts$.subscribe((data: Contract[]) => {
            this.contractsSelect = data.map(contract => ({
                name: "[" + contract.id + "] " + contract.residence.residenceAddress.street + ", " + contract.residence.number + " - " + contract.residence.residenceAddress.district + " - " + contract.residence.residenceAddress.city + " - " + contract.residence.residenceAddress.state + " - " + contract.residence.residenceAddress.country,
                code: contract.id
            }));
        });
    }
    
    getContracts(){
        this.contracts$ = this.contractStateService.listenToChanges();
    }
    
    protected form = this.formBuilderService.group({
        rentalStartDate: ['', Validators.required],
        paymentStatus: ['', Validators.required],
        contract: this.formBuilderService.group({
            id: ['', Validators.required],
        })
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        this.form.patchValue({ 
            contract: { 
                id: this.form.value.contract.id.code 
            } 
        });
        this.form.patchValue({ paymentStatus: this.form.value.paymentStatus.code})
        const formValue = this.form.value;
        console.log(JSON.stringify(formValue, null, 2));
        this.postInvoice(formValue);
    }
    
    postInvoice(invoice: InvoiceCreate){
        this.invoiceService.saveInvoice(invoice).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                this.cleanForm();
                setTimeout(() => {
                    localStorage.removeItem("invoice-form");
                }, 500)
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                try {
                    if(err['status'] == '422'){
                        this.errors = {"erros": err['message']};
                    }else{
                        this.errors = err;
                    }
                } catch (error) {
                    this.errors = { "Erro": "Ocorreu um erro inesperado! Tente novamente mais tarde." };
                }
                
                this.updateErrorList(); 
            }
        });
    }
    
    updateErrorList() {
        this.errorList = Object.entries(this.errors).map(([field, message]) => ({
            field,
            message
        }));
    }
    
    cleanForm(){
        this.form.reset();
    }
}