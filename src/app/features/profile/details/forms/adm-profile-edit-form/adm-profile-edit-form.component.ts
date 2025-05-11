import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';
import { AdmService } from '../../../../../core/services/adm.service';
import { AdmUpdate } from '../../../../../shared/interfaces/adm';
import { AuthUserService } from '../../../../../core/services/authUser.service';

@Component({
    selector: 'app-adm-profile-edit-form',
    imports: [CommonModule, StandardProfileEditFormComponent],
    templateUrl: './adm-profile-edit-form.component.html',
    styleUrl: './adm-profile-edit-form.component.scss'
})

export class AdmProfileEditFormComponent {
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() currentUser!: CurrentUser;
    @Input() accountType!: string;
    
    private admService = inject(AdmService);
    private authUserService = inject(AuthUserService);
    
    recoverDefaultFormValues() {
        this.form.patchValue({
            name: this.currentUser.name,
            phone: this.currentUser.phone,
            email: this.currentUser.email,
        });
    }
    
    postForm = () => {
        this.authUserForm.validForm();
        const data: AdmUpdate = this.form.value;
        
        this.admService.patchAdm(data, this.currentUser.id).subscribe({
            next: (res: any) => {    
                this.authUserForm.successCaseState(false);
                this.toggleProfileEdit();

                this.authUserService.updateAuthUser({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                });
            },
            error: (errors: { [key: string]: string }) => { 
                this.recoverDefaultFormValues();
                this.authUserForm.failCaseState(errors);
                this.toggleProfileEdit();
            }
        });
    }
    
    toggleProfileEdit() {
        if (!this.form.enabled) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }
}
