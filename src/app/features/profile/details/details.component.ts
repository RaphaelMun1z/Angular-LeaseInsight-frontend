import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { FormHandler } from '../../../shared/utils/FormHandler';
import { CurrentUser } from '../../../shared/interfaces/user';
import { InputTextComponent } from '../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../shared/components/input/input-mask/input-mask.component';
import { accountLevels } from '../../../shared/utils/ConstLists';

import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthUserService } from '../../../core/services/authUser.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-details',
    imports: [InputTextModule, AvatarModule, ReactiveFormsModule, FormsModule, ButtonModule, InputMaskComponent, InputTextComponent],
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
        this.authUserForm.setForm(this.form);
        
        this.currentUser$ = this.authUserService.listenToAuthUser();
        this.currentUser$.subscribe({
            next: (user: CurrentUser | null) => {
                if (user) {
                    this.form.patchValue({
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                    })
                    this.accountType = this.getAccountLevel(user.role);
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
