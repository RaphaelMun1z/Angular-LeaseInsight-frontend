import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { ClientStateService } from '../../../../../../core/states/client-state.service';
import { ClientService } from '../../../../../../core/services/client.service';
import { Client, ClientUpdate } from '../../../../../../shared/interfaces/client';
import { BillingAddressStateService } from '../../../../../../core/states/billing-address-state.service';
import { BillingAddress } from '../../../../../../shared/interfaces/billingAddress';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';
import { clientStatus } from '../../../../../../shared/utils/ConstLists';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../../shared/components/input/input-mask/input-mask.component';
import { InputDatepickerComponent } from '../../../../../../shared/components/input/input-datepicker/input-datepicker.component';
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
    selector: 'app-update-client',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputDatepickerComponent, InputTextComponent, InputMaskComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-client.component.html',
    styleUrl: './update-client.component.scss'
})

export class UpdateClientComponent implements OnInit {
    clientUpdateForm = new FormHandler("client-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Clientes', route: '/dashboard/clientes' }, { label: 'Atualizar', route: '/dashboard/clientes/atualizar' }];
    protected form!: UntypedFormGroup;
    
    clientStatus = clientStatus;
    addressesList: {name: string, code: string | number }[] = [];
    currentId!: string;
    client! : Client;

    protected addresses$ = new Observable<BillingAddress[]>();
    selectedOption!: BillingAddress;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    private clientStateService = inject(ClientStateService);
    private billingAddressStateService = inject(BillingAddressStateService);
    constructor(){
        this.billingAddressStateService.loadBillingAddresses();
    }
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.clientStateService.loadClient(this.currentId).subscribe({
                next: (client: Client | null) => {
                    if(client){
                        this.form.patchValue({
                            name: client.name,
                            phone: client.phone,
                            email: client.email,
                            dateOfBirth: client.dateOfBirth,
                            cpf: client.cpf,
                            rg: client.rg,
                            tenantStatus: client.tenantStatus,
                            tenantBillingAddress: { id: client.tenantBillingAddress.id }
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/clientes']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            name: [''],
            phone: [''],
            email: [''],
            dateOfBirth: [''],
            cpf: [''],
            rg: [''],
            tenantStatus: [''],
            tenantBillingAddress: this.formBuilderService.group({
                id: [''],
            })
        })
        this.clientUpdateForm.setForm(this.form);
        
        this.addresses$ = this.billingAddressStateService.listenToBillingAddressesChanges();
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
        this.clientUpdateForm.validForm();
        const data: ClientUpdate = this.form.value;
        this.clientService.patchClient(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.clientUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/clientes']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.clientUpdateForm.failCaseState(errors);
            }
        });
    }
}