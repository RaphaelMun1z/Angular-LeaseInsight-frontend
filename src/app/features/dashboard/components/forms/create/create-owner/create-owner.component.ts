import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';
import { OwnerCreate } from '../../../../../../shared/interfaces/owner';
import { OwnerService } from '../../../../../../core/services/owner.service';

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
    selector: 'app-create-owner',
    imports: [FormStorageDirective, FormErrorsComponent, BreadcrumbComponent, InputTextComponent, InputMaskComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-owner.component.html',
    styleUrl: './create-owner.component.scss'
})

export class CreateOwnerComponent implements OnInit {
    ownerCreateForm = new FormHandler("owner-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Proprietários', route: '/dashboard/proprietarios' }, { label: 'Cadastrar', route: '/dashboard/proprietarios/criar' }];
    protected form!: UntypedFormGroup;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private ownerService = inject(OwnerService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        })
        
        this.ownerCreateForm.setForm(this.form);  
    }
    
    postForm(){
        this.ownerCreateForm.validForm();
        const data: OwnerCreate = this.form.value;

        this.ownerService.saveOwner(data).subscribe({
            next: (res: any) => {    
                this.ownerCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.ownerCreateForm.failCaseState(errors);
            }
        });
    }
}