import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormCreate } from '../../../../../shared/utils/FormCreate';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { AdditionalFeatureCreate } from '../../../../../shared/interfaces/additionalFeature';
import { AdditionalFeatureService } from '../../../../../core/services/additionalFeature.service';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-property-feature',
    imports: [FormStorageDirective, BreadcrumbComponent, FormErrorsComponent, InputTextComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-property-feature.component.html',
    styleUrl: './create-property-feature.component.scss'
})

export class CreatePropertyFeatureComponent implements OnInit {
    propertyFeatureCreateForm = new FormCreate("property-feature-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Característica', route: '/dashboard/imoveis/caracteristicas/criar' }, { label: 'Cadastrar', route: '/dashboard/imoveis/caracteristicas/criar' }];
    protected form!: UntypedFormGroup;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private additionalFeatureService = inject(AdditionalFeatureService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            feature: ['', Validators.required]
        })
        
        this.propertyFeatureCreateForm.setForm(this.form);
    }
    
    postForm(){
        this.propertyFeatureCreateForm.validForm();
        const data: AdditionalFeatureCreate = this.form.value;
        
        this.additionalFeatureService.saveAdditionalFeature(data).subscribe({
            next: (res: any) => {    
                this.propertyFeatureCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyFeatureCreateForm.failCaseState(errors);
            }
        });
    }
}