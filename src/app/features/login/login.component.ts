import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { FormHandler } from '../../shared/utils/FormHandler';

import { InputTextComponent } from '../../shared/components/input/input-text/input-text.component';
import { InputPasswordComponent } from '../../shared/components/input/input-password/input-password.component';
import { FormErrorsComponent } from '../../shared/components/form-errors/form-errors.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, PasswordModule, CommonModule, FormErrorsComponent, InputTextComponent, InputPasswordComponent, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
    loginForm = new FormHandler(null);
    protected form!: UntypedFormGroup;
    
    isLoading: boolean = false;
    
    router = inject(Router)
    private formBuilderService = inject(UntypedFormBuilder);
    private authService = inject(AuthService);
    constructor(){}
    
    ngOnInit(): void {
        this.form = this.formBuilderService.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })
        this.loginForm.setForm(this.form);
    }
    
    postForm(){
        this.isLoading = true;
        this.loginForm.validForm();
        const data: any = this.form.value;
        this.authService.signin(data).subscribe({
            next: (res: any) => {
                this.isLoading = false;  
                this.loginForm.successCaseState();
                this.router.navigate(['']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.isLoading = false;  
                this.loginForm.failCaseState(errors);
            }
        });
    }
    
    /* onSubmit() {
    this.clearMessages()
    this.messages.push({ severity: 'info', icon: 'pi-spinner-dotted', content: 'Carregando...', className: 'animated-icon' },);
    if(this.form.valid){
    this.authService.signin(this.form.value).subscribe({
    next: (response) => {
    this.clearMessages()
    if (response && response.token) {
    this.router.navigate(['']);
    } else {
    this.messages.push({ severity: 'warn', icon: 'pi-exclamation-triangle', content: 'Login falhou!' });
    }
    },
    error: (err: ErrorResponse | undefined) => {
    this.clearMessages()
    if(err && err.status === 401){
    this.messages.push({ severity: 'error', icon: 'pi-times-circle', content: 'Credenciais Inválidas!!' });
    }else {
    this.messages.push({ severity: 'warn', icon: 'pi-exclamation-triangle', content: 'Sistema Indisponível no Momento!' },);
    }
    }
    })
    }
    } */
    
    formIsValidated(): boolean{
        return this.form.invalid;
    }
}
