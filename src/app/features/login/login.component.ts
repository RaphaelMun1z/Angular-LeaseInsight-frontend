import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { ErrorResponse } from '../../shared/interfaces/errorResponse';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, PasswordModule, CommonModule, Message, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {
    form: FormGroup;
    messages: {severity: string, icon: string, content: string, className?: string}[] = [];
    
    authService = inject(AuthService);
    router = inject(Router)
    
    constructor(private fb: FormBuilder){
        this.form = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        })
    }
    
    onSubmit() {
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
    }
    
    clearMessages() {
        this.messages.length = 0;
    }
}
