import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { ClientUpdate } from '../../../../../shared/interfaces/client';
import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';
import { EmployeeService } from '../../../../../core/services/employee.service';

@Component({
    selector: 'app-staff-profile-edit-form',
    imports: [CommonModule, StandardProfileEditFormComponent],
    templateUrl: './staff-profile-edit-form.component.html',
    styleUrl: './staff-profile-edit-form.component.scss'
})

export class StaffProfileEditFormComponent {
    @Input() form!: UntypedFormGroup;
    @Input() authUserForm!: FormHandler;
    @Input() currentUser!: CurrentUser;
    @Input() accountType!: string;
    
    private employeeService = inject(EmployeeService);
    
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
        
        this.employeeService.patchEmployee(data, this.currentUser.id).subscribe({
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