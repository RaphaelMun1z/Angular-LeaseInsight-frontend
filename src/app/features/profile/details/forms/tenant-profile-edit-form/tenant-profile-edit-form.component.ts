import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { ClientService } from '../../../../../core/services/client.service';
import { Client, ClientUpdate } from '../../../../../shared/interfaces/client';
import { CurrentTenant, CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';
import { InputMaskComponent } from '../../../../../shared/components/input/input-mask/input-mask.component';
import { AuthUserService } from '../../../../../core/services/authUser.service';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { InputSelectComponent } from '../../../../../shared/components/input/input-select/input-select.component';
import { countries } from '../../../../../shared/utils/ConstLists';

@Component({
    selector: 'app-tenant-profile-edit-form',
    imports: [CommonModule, StandardProfileEditFormComponent, InputMaskComponent, InputTextComponent, InputSelectComponent, ReactiveFormsModule],
    templateUrl: './tenant-profile-edit-form.component.html',
    styleUrl: './tenant-profile-edit-form.component.scss'
})

export class TenantProfileEditFormComponent implements OnInit{
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() currentUser!: CurrentUser | CurrentTenant;
    @Input() accountType!: string;
    
    client!: Client;
    countriesList = countries;
    
    private authUserService = inject(AuthUserService);
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    
    ngOnInit(): void {
        this.form.addControl('cpf', this.formBuilderService.control(''));
        this.form.addControl('rg', this.formBuilderService.control(''));
        const addressGroup = this.formBuilderService.group({
            number: [''],
            street: [''],
            district: [''],
            city: [''],
            state: [''],
            country: [''],
            cep: [''],
            complement: ['']
        });
        this.form.addControl('tenantBillingAddress', addressGroup);
        this.form.disable();
        
        this.authUserService.getAuthUser().subscribe({
            next: (user: CurrentUser | null) => {
                this.client = user as Client;
                this.recoverDefaultFormValues();
            },
            error: (err) => {
                console.log("Erro! " + err);
            }
        })
    }
    
    recoverDefaultFormValues() {
        this.form.patchValue({
            name: this.client.name,
            phone: this.client.phone,
            email: this.client.email,
            rg: this.client.rg,
            cpf: this.client.cpf,
            tenantBillingAddress: {
                number: this.client.tenantBillingAddress?.number,
                street: this.client.tenantBillingAddress?.street,
                district: this.client.tenantBillingAddress?.district,
                city: this.client.tenantBillingAddress?.city,
                state: this.client.tenantBillingAddress?.state,
                country: this.client.tenantBillingAddress?.country,
                cep: this.client.tenantBillingAddress?.cep,
                complement: this.client.tenantBillingAddress?.complement
            }
        });
    }
    
    postForm = () => {
        this.authUserForm.validForm();
        const data: ClientUpdate = this.form.value;
        
        this.clientService.patchClient(data, this.currentUser.id).subscribe({
            next: (res: any) => {    
                this.authUserForm.successCaseState(false);
            },
            error: (errors: { [key: string]: string }) => { 
                this.recoverDefaultFormValues();
                this.authUserForm.failCaseState(errors);
            }
        });
    }
}
