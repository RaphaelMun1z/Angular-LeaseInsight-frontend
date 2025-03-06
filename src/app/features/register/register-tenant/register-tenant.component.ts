import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { FormHandler } from '../../../shared/utils/FormHandler';
import { OwnerService } from '../../../core/services/owner.service';
import { OwnerCreate } from '../../../shared/interfaces/owner';
import { passwordMatchValidator } from '../../../shared/validators/password-match-validator/password-match-validator.component';

import { InputTextComponent } from '../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../shared/components/input/input-mask/input-mask.component';
import { InputPasswordComponent } from '../../../shared/components/input/input-password/input-password.component';
import { FormErrorsComponent } from '../../../shared/components/form-errors/form-errors.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../../core/services/client.service';
import { ClientCreate } from '../../../shared/interfaces/client';
import { InputDatepickerComponent } from '../../../shared/components/input/input-datepicker/input-datepicker.component';

@Component({
    selector: 'app-register-tenant',
    imports: [ReactiveFormsModule, PasswordModule, CommonModule, FormErrorsComponent, FloatLabelModule, InputDatepickerComponent, InputPasswordComponent, InputTextComponent, InputMaskComponent, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './register-tenant.component.html',
    styleUrl: './register-tenant.component.scss'
})

export class RegisterTenantComponent implements OnInit {
    tenantRegisterForm = new FormHandler(null);
    protected form!: UntypedFormGroup;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    constructor(){}
    
    ngOnInit(): void {
        this.form = this.formBuilderService.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            cpf: ['', Validators.required],
            rg: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },
        { validators: passwordMatchValidator('password', 'confirmPassword') })
        this.tenantRegisterForm.setForm(this.form);
    }
    
    get passwordMismatch() {
        return this.form.hasError('passwordMismatch');
    }
    
    postForm(){
        this.tenantRegisterForm.validForm();
        const data: ClientCreate = this.form.value;
        this.clientService.saveClient(data).subscribe({
            next: (res: any) => {    
                this.tenantRegisterForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.tenantRegisterForm.failCaseState(errors);
            }
        });
    }
    
    formIsValidated(): boolean{
        return this.form.invalid;
    }
}
