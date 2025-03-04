import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OwnerStateService } from '../../../../../../core/states/owner-state.service';
import { OwnerService } from '../../../../../../core/services/owner.service';
import { Owner, OwnerUpdate } from '../../../../../../shared/interfaces/owner';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../../shared/components/input/input-mask/input-mask.component';
import { BreadcrumbComponent } from '../../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-update-owner',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputTextComponent, InputMaskComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-owner.component.html',
    styleUrl: './update-owner.component.scss'
})

export class UpdateOwnerComponent implements OnInit {
    ownerUpdateForm = new FormHandler("owner-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Proprietários', route: '/dashboard/proprietarios' }, { label: 'Atualizar', route: '/dashboard/proprietarios/atualizar' }];
    protected form!: UntypedFormGroup;
    
    currentId!: string;
    owner! : Owner;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private ownerService = inject(OwnerService);
    private ownerStateService = inject(OwnerStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.ownerStateService.loadOwner(this.currentId).subscribe({
                next: (owner: Owner | null) => {
                    if(owner){
                        this.form.patchValue({
                            name: owner.name,
                            phone: owner.phone,
                            email: owner.email
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/proprietarios']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            name: [''],
            phone: [''],
            email: ['']
        })
        this.ownerUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.ownerUpdateForm.validForm();
        const data: OwnerUpdate = this.form.value;
        this.ownerService.patchOwner(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.ownerUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/proprietarios']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.ownerUpdateForm.failCaseState(errors);
            }
        });
    }
}
