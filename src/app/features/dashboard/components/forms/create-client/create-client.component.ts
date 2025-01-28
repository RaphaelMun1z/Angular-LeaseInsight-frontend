import { Component, inject, OnInit } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ClientService } from '../../../../../core/services/client.service';
import { ClientCreate } from '../../../../../shared/interfaces/client';
import { BillingAddress } from '../../../../../shared/interfaces/billingAddress';
import { Observable } from 'rxjs';
import { BillingAddressStateService } from '../../../../../core/states/billing-address-state.service';
import { CreateBillingAddressComponent } from '../create-billing-address/create-billing-address.component';

@Component({
    selector: 'app-create-client',
    imports: [DashboardBaseComponent, ContentBlockComponent, FormsModule, CreateBillingAddressComponent, SelectModule, Message, ButtonModule, CommonModule, InputMask, DatePicker, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-client.component.html',
    styleUrl: './create-client.component.scss'
})

export class CreateClientComponent implements OnInit {
    addresses: BillingAddress[] = [];
    protected addresses$ = new Observable<BillingAddress[]>();
    addressFormIsOpen: boolean = false;
    selectedOption!: BillingAddress;
    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    
    constructor(private billingAddressStateService: BillingAddressStateService){
        this.billingAddressStateService.loadBillingAddresses();
    }
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        
        this.status = [
            "ACTIVE",
            "INACTIVE",
            "PENDING",
            "FORMER",
            "PROSPECTIVE"
        ];
        
        this.getBillingAdresses();
        this.addresses$.subscribe((data: BillingAddress[]) => {
            this.addresses = data;
        });
        
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        this.form.patchValue({
            registrationDate: formattedDate
        });
    }
    
    protected form = this.formBuilderService.group({
        id: null,
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        password: [''],
        dateOfBirth: ['', Validators.required],
        cpf: ['', Validators.required],
        rg: ['', Validators.required],
        registrationDate: [''],
        tenantStatus: ['', Validators.required],
        tenantBillingAddress: this.formBuilderService.group({
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
        
        const formValue = this.form.value;
        formValue.dateOfBirth = this.formatDate(formValue.dateOfBirth);
        formValue.tenantBillingAddress = { "id": this.selectedOption.id};
        this.postClient(formValue);
    }
    
    getBillingAdresses(){
        this.addresses$ = this.billingAddressStateService.listenToChanges();
    }
    
    postClient(client: ClientCreate){
        this.clientService.saveClient(client).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                if((err['status'] == '422')){
                    this.errors = {"erros": err['message']};
                }else{
                    this.errors = err;
                }
                this.updateErrorList(); 
            }
        });
    }
    
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
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
    
    addressFormStatus(status: boolean){
        this.addressFormIsOpen = status;
    }
}