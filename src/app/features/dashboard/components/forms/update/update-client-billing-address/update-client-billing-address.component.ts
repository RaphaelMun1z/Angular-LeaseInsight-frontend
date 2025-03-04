import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BillingAddress, BillingAddressUpdate } from '../../../../../../shared/interfaces/billingAddress';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';
import { BillingAddressService } from '../../../../../../core/services/billingAddress.service';
import { BillingAddressStateService } from '../../../../../../core/states/billing-address-state.service';
import { countries } from '../../../../../../shared/utils/ConstLists';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { InputMaskComponent } from '../../../../../../shared/components/input/input-mask/input-mask.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
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
    selector: 'app-update-client-billing-address',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputMaskComponent, InputTextComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-client-billing-address.component.html',
    styleUrl: './update-client-billing-address.component.scss'
})

export class UpdateClientBillingAddressComponent implements OnInit {
    clientBillingAddressUpdateForm = new FormHandler("client-billing-address-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Clientes', route: '/dashboard/clientes' }, { label: 'Endereços de Cobrança', route: '/dashboard/clientes/enderecos-de-cobranca' }, { label: 'Atualizar', route: '/dashboard/clientes/enderecos-de-cobranca/atualizar' }];
    protected form!: UntypedFormGroup;
    
    currentId!: string;
    countriesList = countries;
    clientBillingAddress!: BillingAddress;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private billingAddressService = inject(BillingAddressService);
    private billingAddressStateService = inject(BillingAddressStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.billingAddressStateService.loadBillingAddress(this.currentId).subscribe({
                next: (clientBillingAddress: BillingAddress | null) => {
                    if(clientBillingAddress){
                        this.form.patchValue({
                            number: clientBillingAddress.number,
                            street: clientBillingAddress.street,
                            district: clientBillingAddress.district,
                            city: clientBillingAddress.city,
                            state: clientBillingAddress.state,
                            country: clientBillingAddress.country,
                            cep: clientBillingAddress.cep,
                            complement: clientBillingAddress.complement
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/clientes/enderecos-de-cobranca']);
                }
            });
        });
        
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
        this.clientBillingAddressUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.clientBillingAddressUpdateForm.validForm();
        const data: BillingAddressUpdate = this.form.value;
        this.billingAddressService.patchBillingAddress(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.clientBillingAddressUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/clientes/enderecos-de-cobranca']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.clientBillingAddressUpdateForm.failCaseState(errors);
            }
        });
    }
}