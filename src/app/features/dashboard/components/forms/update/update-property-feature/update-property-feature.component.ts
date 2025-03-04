import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdditionalFeatureService } from '../../../../../../core/services/additionalFeature.service';
import { AdditionalFeatureStateService } from '../../../../../../core/states/additional-feature.service';
import { AdditionalFeature, AdditionalFeatureUpdate } from '../../../../../../shared/interfaces/additionalFeature';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
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
    selector: 'app-update-property-feature',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputTextComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-property-feature.component.html',
    styleUrl: './update-property-feature.component.scss'
})

export class UpdatePropertyFeatureComponent implements OnInit {
    propertyAdditionalFeatureUpdateForm = new FormHandler("property-additional-feature-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Característica', route: '/dashboard/imoveis/caracteristicas' }, { label: 'Atualizar', route: '/dashboard/imoveis/caracteristicas/atualizar' }];
    protected form!: UntypedFormGroup;
    
    currentId!: string;
    additionalFeature! : AdditionalFeature;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private additionalFeatureService = inject(AdditionalFeatureService);
    private additionalFeatureStateService = inject(AdditionalFeatureStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.additionalFeatureStateService.loadAdditionalFeature(this.currentId).subscribe({
                next: (additionalFeature: AdditionalFeature | null) => {
                    if(additionalFeature){
                        this.form.patchValue({
                            feature: additionalFeature.feature
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/imoveis/caracteristicas']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            feature: ['']
        })
        this.propertyAdditionalFeatureUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.propertyAdditionalFeatureUpdateForm.validForm();
        const data: AdditionalFeatureUpdate = this.form.value;
        this.additionalFeatureService.patchAdditionalFeature(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.propertyAdditionalFeatureUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/imoveis/caracteristicas']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyAdditionalFeatureUpdateForm.failCaseState(errors);
            }
        });
    }
}