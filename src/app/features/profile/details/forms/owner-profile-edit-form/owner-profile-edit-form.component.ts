import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ClientUpdate } from '../../../../../shared/interfaces/client';
import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';
import { OwnerService } from '../../../../../core/services/owner.service';

@Component({
    selector: 'app-owner-profile-edit-form',
    imports: [CommonModule, StandardProfileEditFormComponent],
    templateUrl: './owner-profile-edit-form.component.html',
    styleUrl: './owner-profile-edit-form.component.scss'
})

export class OwnerProfileEditFormComponent {
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() currentUser!: CurrentUser;
    @Input() accountType!: string;
    
    private ownerService = inject(OwnerService);

    recoverDefaultFormValues() {
        this.form.patchValue({
            name: this.currentUser.name,
            phone: this.currentUser.phone,
            email: this.currentUser.email,
        });
    }
    
    postForm = () => {
        this.authUserForm.validForm();
        const data: ClientUpdate = this.form.value;
        
        this.ownerService.patchOwner(data, this.currentUser.id).subscribe({
            next: (res: any) => {    
                this.authUserForm.successCaseState(false);
                this.toggleProfileEdit();
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
