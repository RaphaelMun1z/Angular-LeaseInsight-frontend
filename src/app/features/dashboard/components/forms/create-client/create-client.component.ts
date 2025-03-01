import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormCreate } from '../../../../../shared/utils/FormCreate';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { ClientCreate } from '../../../../../shared/interfaces/client';
import { ClientService } from '../../../../../core/services/client.service';
import { BillingAddressStateService } from '../../../../../core/states/billing-address-state.service';
import { BillingAddress } from '../../../../../shared/interfaces/billingAddress';
import { clientStatus } from '../../../../../shared/utils/ConstLists';

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
import { RouterModule } from '@angular/router';
import { InputMask } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create-client',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, Message, ButtonModule, CommonModule, InputMask, DatePicker, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-client.component.html',
    styleUrl: './create-client.component.scss'
})

export class CreateClientComponent implements OnInit {
    clientCreateForm = new FormCreate("client-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Clientes', route: '/dashboard/clientes' }, { label: 'Cadastrar', route: '/dashboard/clientes/criar' }];
    protected form!: UntypedFormGroup;
    
    clientStatus = clientStatus;
    addressesList: {name: string, code: string | number }[] = [];
    protected addresses$ = new Observable<BillingAddress[]>();
    selectedOption!: BillingAddress;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    private billingAddressStateService = inject(BillingAddressStateService);
    constructor(){
        this.billingAddressStateService.loadBillingAddresses();
    }
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            cpf: ['', Validators.required],
            rg: ['', Validators.required],
            tenantStatus: ['', Validators.required],
            tenantBillingAddress: this.formBuilderService.group({
                id: ['', Validators.required],
            })
        })
        this.clientCreateForm.setForm(this.form);
        
        this.addresses$ = this.billingAddressStateService.listenToChanges();
        this.addresses$.subscribe((data: BillingAddress[]) => {
            this.addressesList = this.addressesToList(data);
        });
    }
    
    addressesToList(data: BillingAddress[]): {name: string, code: string | number }[] {
        return data.map(address => ({
            name: `${address.street}, ${address.number} - ${address.district}, ${address.city} - ${address.state}, ${address.country}, CEP: ${address.cep}`,
            code: address.id
        }));
    }
    
    postForm(){
        this.clientCreateForm.validForm();
        const data: ClientCreate = this.form.value;
        this.clientService.saveClient(data).subscribe({
            next: (res: any) => {    
                this.clientCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.clientCreateForm.failCaseState(errors);
            }
        });
    }
}