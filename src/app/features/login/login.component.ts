import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, InputMaskModule, IftaLabelModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {
    form: FormGroup;
    authService = inject(AuthService);
    
    constructor(private fb: FormBuilder){
        this.form = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        })
    }
    
    onSubmit() {
        if(this.form.valid){
            console.log(this.form.value)
            this.authService.login(this.form.value).subscribe({
                next: (response) => {
                    console.log(response);
                }
            })
        }
    }
}
