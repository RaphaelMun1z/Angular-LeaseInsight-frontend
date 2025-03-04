import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { Contract, ContractUpdate } from '../../../../../../shared/interfaces/contract';
import { ContractService } from '../../../../../../core/services/contract.service';
import { ContractStateService } from '../../../../../../core/states/contract-state.service';
import { contractStatus } from '../../../../../../shared/utils/ConstLists';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
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
    selector: 'app-update-contract',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-contract.component.html',
    styleUrl: './update-contract.component.scss'
})

export class UpdateContractComponent implements OnInit {
    contractUpdateForm = new FormHandler("contract-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Contrato', route: '/dashboard/contratos' }, { label: 'Atualizar', route: '/dashboard/contratos/atualizar' }];
    protected form!: UntypedFormGroup;
    
    contractStatus = contractStatus;
    currentId!: string;
    contract! : Contract;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private contractService = inject(ContractService);
    private contractStateService = inject(ContractStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.contractStateService.loadContract(this.currentId).subscribe({
                next: (contract: Contract | null) => {
                    if(contract){
                        this.form.patchValue({
                            contractStatus: contract.contractStatus
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/contratos']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            contractStatus: ['']
        })
        this.contractUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.contractUpdateForm.validForm();
        const data: ContractUpdate = this.form.value;
        this.contractService.patchContract(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.contractUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/contratos']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.contractUpdateForm.failCaseState(errors);
            }
        });
    }
}