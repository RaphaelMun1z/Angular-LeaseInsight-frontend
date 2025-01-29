import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { RouterModule } from '@angular/router';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { FormStorageDirective } from './steps/form-storage.directive';

@Component({
    selector: 'app-create-contract',
    imports: [FormStorageDirective, StepsModule, RouterModule, DashboardBaseComponent, FormsModule, ReactiveFormsModule, ContentBlockComponent],
    templateUrl: './create-contract.component.html',
    styleUrl: './create-contract.component.scss'
})

export class CreateContractComponent  implements OnInit {    
    steps!: MenuItem[];
    
    private formBuilderService = inject(UntypedFormBuilder);
    
    ngOnInit() {
        this.steps = [
            {
                label: 'Selecionar Imóvel',
                routerLink: 'selecionar-imovel'
            },
            {
                label: 'Selecionar Cliente',
                routerLink: 'selecionar-cliente'
            },
            {
                label: 'Detalhes',
                routerLink: 'detalhes'
            },
            {
                label: 'Confirmação',
                routerLink: 'confirmacao'
            }
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
            defaultRentalValue: [0, Validators.required],
            contractStatus: ['', Validators.required],
            invoiceDueDate: [0, Validators.required],
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
}