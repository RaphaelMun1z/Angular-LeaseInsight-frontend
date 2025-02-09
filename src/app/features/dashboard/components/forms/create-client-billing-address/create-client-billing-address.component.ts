import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { BillingAddress, BillingAddressCreate } from '../../../../../shared/interfaces/billingAddress';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { BillingAddressService } from '../../../../../core/services/billingAddress.service';
import { CepService } from '../../../../../core/services/cep.service';
import { BillingAddressStateService } from '../../../../../core/states/billing-address-state.service';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';

@Component({
    selector: 'app-create-client-billing-address',
    imports: [DashboardBaseComponent, FormStorageDirective, ContentBlockComponent, InputNumber, InputMask, Message, CommonModule, ReactiveFormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, PasswordModule, ButtonModule, SelectModule],
    templateUrl: './create-client-billing-address.component.html',
    styleUrl: './create-client-billing-address.component.scss'
})

export class CreateClientBillingAddressComponent implements OnInit {
    billingAddresses: BillingAddress[] = [];
    @Output() openAddressForm = new EventEmitter<boolean>();
    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    cepError: boolean = false;
    loading: boolean = false;
    
    private cepService = inject(CepService);
    private formBuilderService = inject(UntypedFormBuilder);
    private billingAddressService = inject(BillingAddressService);
    private billingAddressStateService = inject(BillingAddressStateService);
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        
        this.listenToCepInput();
    }
    
    protected form = this.formBuilderService.group({
        number: [0, Validators.required],
        street: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        cep: ['', Validators.required],
        complement: ['']
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        const formValue = this.form.value;
        this.postBillingAddress(formValue);
    }
    
    getAddress(cepNumber: string){
        this.cepService.getAddressByCep(cepNumber).subscribe({
            next: (data) => {
                if(!data.erro){
                    this.form.patchValue({
                        street: data.logradouro,
                        district: data.bairro,
                        city: data.localidade,
                        state: data.estado
                    })
                }else{
                    this.cepError = true;
                    setTimeout(() => {
                        this.cepError = false;
                    }, 5000)
                }
            },
            error: (err) => {
                console.error('Erro ao buscar endereço:', err);
            }
        });
    }
    
    listenToCepInput(){
        this.form.get('cep')?.valueChanges.subscribe(value => {
            if(value.replace(/[._-]/g, "")?.length == 8){
                this.getAddress(value.replace(/[._-]/g, ""));
            }
        })
    }
    
    postBillingAddress(billingAddress: BillingAddressCreate){
        this.billingAddressService.saveBillingAddress(billingAddress).subscribe({
            next: (res: any) => { 
                this.billingAddressStateService.addBillingAddress(res);
                this.loading = false;
                this.sendSuccess = true;
                this.cleanForm();
                setTimeout(() => {
                    localStorage.removeItem("client-billing-address-form");
                }, 500)
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                if(err && (err['status'] == '422')){
                    this.errors = {"erros": err['message']};
                }else if(err){
                    this.errors = err;
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
    
    closeForm(){
        this.openAddressForm.emit(false);
    }
}
