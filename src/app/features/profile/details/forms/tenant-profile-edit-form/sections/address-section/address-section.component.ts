import { Component, inject, Input, OnInit } from '@angular/core';

import { InputMaskComponent } from '../../../../../../../shared/components/input/input-mask/input-mask.component';
import { InputTextComponent } from '../../../../../../../shared/components/input/input-text/input-text.component';
import { InputSelectComponent } from '../../../../../../../shared/components/input/input-select/input-select.component';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { countries } from '../../../../../../../shared/utils/ConstLists';
import { BillingAddress } from '../../../../../../../shared/interfaces/billingAddress';
import { BillingAddressService } from '../../../../../../../core/services/billingAddress.service';
import { take } from 'rxjs';
import { FormHandler } from '../../../../../../../shared/utils/FormHandler';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormErrorsComponent } from '../../../../../../../shared/components/form-errors/form-errors.component';
import { LoadingComponent } from '../../../../../../../core/components/loading/loading.component';

@Component({
    selector: 'app-address-section',
    imports: [CommonModule, InputMaskComponent, ButtonModule, LoadingComponent, FormErrorsComponent, InputTextComponent, InputSelectComponent, ReactiveFormsModule],
    templateUrl: './address-section.component.html',
    styleUrl: './address-section.component.scss'
})
export class AddressSectionComponent implements OnInit{
    billingAddressForm = new FormHandler(null);
    protected form!: UntypedFormGroup;
    
    billingAddress! : BillingAddress;
    
    loading: boolean = true;
    systemDown: boolean = false;
    
    countriesList = countries;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private service = inject(BillingAddressService);
    
    ngOnInit(): void {
        this.form = this.formBuilderService.group({
            number: [''],
            street: [''],
            district: [''],
            city: [''],
            state: [''],
            country: [''],
            cep: [''],
            complement: ['']
        })
        this.form.disable();
        this.billingAddressForm.setForm(this.form);
        
        this.getData();
    }
    
    getData() {
        this.systemDown = false;
        this.loading = true;
        
        this.service
        .getBillingAddressByAuthUser()
        .pipe(take(1))
        .subscribe({
            next: (data: BillingAddress) => {
                this.billingAddress = data;
                this.recoverDefaultFormValues();
                setTimeout(() => {
                    this.loading = false;
                }, 1000) 
            },
            error: (err) => {
                setTimeout(() => {
                    this.loading = false;
                }, 1000) 
                this.systemDown = true;
            },
            complete: () => {
                setTimeout(() => {
                    this.loading = false;
                }, 1000) 
            }
        });
    }
    
    private recoverDefaultFormValues(): void {
        this.form.patchValue({
            number: this.billingAddress.number,
            street: this.billingAddress.street,
            district: this.billingAddress.district,
            city: this.billingAddress.city,
            state: this.billingAddress.state,
            country: this.billingAddress.country,
            cep: this.billingAddress.cep,
            complement: this.billingAddress.complement
        });
    }
    
    toggleProfileEdit() {
        if (!this.form.enabled) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }
    
    onCancel(): void {
        this.form.reset(this.billingAddress);
        this.form.disable();
    }
    
    postForm(): void {
        this.billingAddressForm.validForm();
        const data: BillingAddress = this.form.value;
        
        this.service.patchBillingAddress(data, this.billingAddress.id).subscribe({
            next: (res: any) => {   
                this.billingAddress = res; 
                this.billingAddressForm.successCaseState(false);
                this.toggleProfileEdit();
            },
            error: (errors: { [key: string]: string }) => { 
                this.recoverDefaultFormValues();
                this.billingAddressForm.failCaseState(errors);
            }
        });
    }
}
