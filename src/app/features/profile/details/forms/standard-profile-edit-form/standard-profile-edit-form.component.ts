import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';

import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../shared/components/input/input-mask/input-mask.component';
import { FormErrorsComponent } from '../../../../../shared/components/form-errors/form-errors.component';

import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'app-standard-profile-edit-form',
    imports: [CommonModule, InputTextModule, Button, AvatarModule, ButtonModule, FormsModule, ReactiveFormsModule, InputMaskComponent, InputTextComponent, FormErrorsComponent],
    templateUrl: './standard-profile-edit-form.component.html',
    styleUrl: './standard-profile-edit-form.component.scss'
})

export class StandardProfileEditFormComponent {
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() accountType!: string;

    @Input() postForm?: () => void;
    
    toggleProfileEdit() {
        if (!this.form.enabled) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }
}