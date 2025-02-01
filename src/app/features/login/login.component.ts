import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorResponse } from '../../shared/interfaces/errorResponse';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, Message, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
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
            this.authService.login(this.form.value).subscribe({
                next: (response) => {
                    this.clearMessages()
                    this.router.navigate(['']);
                },
                error: (err: ErrorResponse) => {
                    this.clearMessages()
                    if(err.status === 401){
                        this.messages.push({ severity: 'error', icon: 'pi-times-circle', content: 'Credenciais Inválidas!!' });
                    }else{
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
