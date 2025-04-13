import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientService } from '../../../../../core/services/client.service';
import { ClientUpdate } from '../../../../../shared/interfaces/client';
import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';

@Component({
    selector: 'app-tenant-profile-edit-form',
    imports: [CommonModule, StandardProfileEditFormComponent],
    templateUrl: './tenant-profile-edit-form.component.html',
    styleUrl: './tenant-profile-edit-form.component.scss'
})

export class TenantProfileEditFormComponent {
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() currentUser!: CurrentUser;
    @Input() accountType!: string;

    private clientService = inject(ClientService);

    recoverDefaultFormValues() {
        this.form.patchValue({
            name: this.currentUser.name,
            phone: this.currentUser.phone,
            email: this.currentUser.email,
        });
    }
    
    postForm(){
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
