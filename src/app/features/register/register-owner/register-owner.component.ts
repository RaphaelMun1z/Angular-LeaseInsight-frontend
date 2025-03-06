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

@Component({
    selector: 'app-register-owner',
    imports: [ReactiveFormsModule, PasswordModule, CommonModule, FormErrorsComponent, FloatLabelModule, InputPasswordComponent, InputTextComponent, InputMaskComponent, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './register-owner.component.html',
    styleUrl: './register-owner.component.scss'
})

export class RegisterOwnerComponent implements OnInit {
    ownerRegisterForm = new FormHandler(null);
    protected form!: UntypedFormGroup;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private ownerService = inject(OwnerService);
    constructor(){}
    
    ngOnInit(): void {
        this.form = this.formBuilderService.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },
        { validators: passwordMatchValidator('password', 'confirmPassword') })
        this.ownerRegisterForm.setForm(this.form);
    }
    
    get passwordMismatch() {
        return this.form.hasError('passwordMismatch');
    }
    
    postForm(){
        this.ownerRegisterForm.validForm();
        const data: OwnerCreate = this.form.value;
        this.ownerService.saveOwner(data).subscribe({
            next: (res: any) => {    
                this.ownerRegisterForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.ownerRegisterForm.failCaseState(errors);
            }
        });
    }
    
    formIsValidated(): boolean{
        return this.form.invalid;
    }
}