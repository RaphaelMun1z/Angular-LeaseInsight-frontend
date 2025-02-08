import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { ContractFormService } from '../../../../../core/services/stepped-forms/contract-form.service';

import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
    selector: 'app-create-contract',
    imports: [FormStorageDirective, StepsModule, RouterModule, DashboardBaseComponent, FormsModule, ReactiveFormsModule, ContentBlockComponent],
    templateUrl: './create-contract.component.html',
    styleUrl: './create-contract.component.scss'
})

export class CreateContractComponent  implements OnInit {    
    steps!: MenuItem[];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private contractFormService = inject(ContractFormService);
    
    ngOnInit() {
        this.contractFormService.setForm(this.form);
        this.updateSteps();
        
        this.form.valueChanges.subscribe(() => {
            this.contractFormService.updateStepValidation();
        });
        
        this.contractFormService.stepValidations$.subscribe(() => {
            this.updateSteps();
        });
        
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
            }
        ];
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
    
    protected form = this.formBuilderService.group({
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
    
    getStep1Form(): FormGroup {
        return this.form.get('step1') as FormGroup;
    }
    
    getStep2Form(): FormGroup {
        return this.form.get('step2') as FormGroup;
    }
    
    getStep3Form(): FormGroup {
        return this.form.get('step3') as FormGroup;
    }
    
    getAllSteps(): FormGroup {
        return this.form as FormGroup;
    }
}