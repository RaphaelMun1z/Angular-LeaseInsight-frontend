import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { FormHandler } from '../../../shared/utils/FormHandler';
import { CurrentUser } from '../../../shared/interfaces/user';
import { accountLevels } from '../../../shared/utils/ConstLists';

import { AuthUserService } from '../../../core/services/authUser.service';

import { TenantProfileEditFormComponent } from "./forms/tenant-profile-edit-form/tenant-profile-edit-form.component";
import { OwnerProfileEditFormComponent } from "./forms/owner-profile-edit-form/owner-profile-edit-form.component";
import { AdmProfileEditFormComponent } from './forms/adm-profile-edit-form/adm-profile-edit-form.component';
import { StaffProfileEditFormComponent } from './forms/staff-profile-edit-form/staff-profile-edit-form.component';

@Component({
    selector: 'app-details',
    imports: [CommonModule, TenantProfileEditFormComponent, OwnerProfileEditFormComponent, AdmProfileEditFormComponent, StaffProfileEditFormComponent],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
    authUserForm = new FormHandler(null);
    protected form!: UntypedFormGroup;
    
    protected currentUser$ = new Observable<CurrentUser | null>();
    currentUser!: CurrentUser;
    
    accountType!: string;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private authUserService = inject(AuthUserService);
    
    ngOnInit(): void {
        this.form = this.formBuilderService.group({
            name: [''],
            phone: [''],
            email: ['']
        })
        this.form.disable();
        this.authUserForm.setForm(this.form);
        
        this.currentUser$ = this.authUserService.listenToAuthUser();
        this.currentUser$.subscribe({
            next: (user: CurrentUser | null) => {
                this.currentUser = user!;
                if (user) {
                    this.form.patchValue({
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                    })
                    this.accountType = this.getAccountLevel(user.role);
                    console.log(this.accountType);
                }
            },
            error: (err: any) => {
                console.log("Erro: " + err);
            }
        });
    }
    
    getAccountLevel(code: string): string { 
        return accountLevels.find(level => level.code === code)?.name || "Não foi possível carregar.";
    }
}
