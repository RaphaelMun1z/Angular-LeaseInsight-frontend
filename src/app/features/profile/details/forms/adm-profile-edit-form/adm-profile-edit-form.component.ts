import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { CurrentUser } from '../../../../../shared/interfaces/user';
import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { StandardProfileEditFormComponent } from '../standard-profile-edit-form/standard-profile-edit-form.component';

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
}
