import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { ContractFormService } from '../../../../../../core/services/stepped-forms/contract-form.service';

import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { BreadcrumbComponent } from '../../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormHandler } from '../../../../../../shared/utils/FormHandler';

@Component({
    selector: 'app-create-contract',
    imports: [FormStorageDirective, StepsModule, RouterModule, BreadcrumbComponent, DashboardBaseComponent, FormsModule, ReactiveFormsModule, ContentBlockComponent],
    templateUrl: './create-contract.component.html',
    styleUrl: './create-contract.component.scss'
})

export class CreateContractComponent  implements OnInit {  
    contractCreateForm = new FormHandler("contract-form");
    form!: UntypedFormGroup;
    steps!: MenuItem[];
    breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Contratos', route: '/dashboard/contratos' }, { label: 'Cadastrar', route: '/dashboard/contratos/criar' }];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private contractFormService = inject(ContractFormService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            step1: this.formBuilderService.group({
                residence: this.formBuilderService.group({
                    id: ['', Validators.required],
                }),
            }),
            step2: this.formBuilderService.group({
                tenant: this.formBuilderService.group({
                    id: ['', Validators.required],
                })
            }),
            step3: this.formBuilderService.group({
                contractStartDate: ['', Validators.required],
                contractEndDate: ['', Validators.required],
                defaultRentalValue: [null, Validators.required],
                contractStatus: ['', Validators.required],
                invoiceDueDate: [null, Validators.required],
            }),
        })
        this.contractCreateForm.setForm(this.form);
        this.contractFormService.setForm(this.form);
        this.contractFormService.setFormHandler(this.contractCreateForm);
        
        this.form.valueChanges.subscribe(() => {
            this.contractFormService.updateStepValidation();
        });
        
        this.contractFormService.stepValidations$.subscribe(() => {
            this.updateSteps();
        });
    }
    
    private updateSteps() {
        this.steps = [
            { 
                label: 'Selecionar Imóvel', 
                routerLink: 'selecionar-imovel', 
                disabled: false 
            },
            { 
                label: 'Selecionar Cliente', 
                routerLink: 'selecionar-cliente', 
                disabled: !this.contractFormService.isStepAllowed('selecionar-cliente') 
            },
            { 
                label: 'Detalhes', 
                routerLink: 'detalhes', 
                disabled: !this.contractFormService.isStepAllowed('detalhes') 
            },
            { 
                label: 'Confirmação', 
                routerLink: 'confirmacao',
                disabled: !this.contractFormService.isStepAllowed('confirmacao') 
            },
        ];
    }
}