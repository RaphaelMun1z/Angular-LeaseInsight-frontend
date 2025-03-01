import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormCreate } from '../../../../../shared/utils/FormCreate';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { BillingAddressCreate } from '../../../../../shared/interfaces/billingAddress';
import { BillingAddressService } from '../../../../../core/services/billingAddress.service';
import { CepHandler } from '../../../../../shared/utils/CepHandler';
import { countries } from '../../../../../shared/utils/ConstLists';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from "../../../../../shared/components/input/input-mask/input-mask.component";
import { InputSelectComponent } from "../../../../../shared/components/input/input-select/input-select.component";
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-client-billing-address',
    imports: [DashboardBaseComponent, FormStorageDirective, InputTextComponent, InputMaskComponent, InputSelectComponent, BreadcrumbComponent, FormErrorsComponent, ContentBlockComponent, CommonModule, ReactiveFormsModule, InputTextModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, PasswordModule, ButtonModule, SelectModule],
    templateUrl: './create-client-billing-address.component.html',
    styleUrl: './create-client-billing-address.component.scss'
})

export class CreateClientBillingAddressComponent implements OnInit {
    clientBillingAddressCreateForm = new FormCreate("client-billing-address-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Clientes', route: '/dashboard/clientes' }, { label: 'Endereço de Cobrança', route: '/dashboard/clientes/endereco-de-cobranca/criar' }, { label: 'Cadastrar', route: '/dashboard/clientes/endereco-de-cobranca/criar' }];
    protected form!: UntypedFormGroup;
    
    countriesList = countries;
    addressByCep = new CepHandler();
    
    private formBuilderService = inject(UntypedFormBuilder);
    private billingAddressService = inject(BillingAddressService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            number: [0, Validators.required],
            street: ['', Validators.required],
            district: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            cep: ['', Validators.required],
            complement: ['']
        })
        this.clientBillingAddressCreateForm.setForm(this.form);
        this.listenToCepInput();
    }
    
    postForm(){
        this.clientBillingAddressCreateForm.validForm();
        const data: BillingAddressCreate = this.form.value;
        this.billingAddressService.saveBillingAddress(data).subscribe({
            next: (res: any) => {    
                this.clientBillingAddressCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.clientBillingAddressCreateForm.failCaseState(errors);
            }
        });
    }
    
    listenToCepInput(){
        this.form.get('cep')?.valueChanges.subscribe(value => {
            if(value && value.replace(/[._-]/g, "")?.length == 8){
                this.addressByCep.setAddress(value.replace(/[._-]/g, ""));
                this.form.patchValue({
                    street: this.addressByCep.getStreet(),
                    district: this.addressByCep.getDistrict(),
                    city: this.addressByCep.getCity(),
                    state: this.addressByCep.getState()
                })
            }
        })
    }
}
