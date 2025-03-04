import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AdditionalFeature, AdditionalFeatureCreate } from '../../../../../../shared/interfaces/additionalFeature';
import { PropertyService } from '../../../../../../core/services/property.service';
import { AdditionalFeatureStateService } from '../../../../../../core/states/additional-feature.service';
import { PropertyStateService } from '../../../../../../core/states/property-state.service';
import { Property } from '../../../../../../shared/interfaces/property';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
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
    selector: 'app-create-property-feature-add',
    imports: [FormStorageDirective, RouterModule, BreadcrumbComponent, FormErrorsComponent, InputSelectComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-property-feature-add.component.html',
    styleUrl: './create-property-feature-add.component.scss'
})

export class CreatePropertyFeatureAddComponent implements OnInit {
    propertyFeatureAddForm = new FormHandler("property-feature-add-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Característica', route: '/dashboard/imoveis/caracteristicas' }, { label: 'Adicionar', route: '/dashboard/imoveis/caracteristicas/adicionar' }, { label: 'Adicionar', route: '/dashboard/imoveis/caracteristicas/adicionar' }];
    protected form!: UntypedFormGroup;
    
    propertiesSelect!: { name: string, code: string | number }[];
    featuresSelect!: { name: string, code: string | number }[];
    
    protected properties$ = new Observable<Property[]>();
    properties : Property[] = [];
    
    protected additionalFeatures$ = new Observable<AdditionalFeature[]>();
    additionalFeatures : AdditionalFeature[] = [];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyService = inject(PropertyService);
    private additionalFeatureStateService = inject(AdditionalFeatureStateService);
    private propertyStateService = inject(PropertyStateService);
    constructor(){
        this.propertyStateService.loadProperties();
        this.additionalFeatureStateService.loadAdditionalFeatures();
    }
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            propertyId: ['', Validators.required],
            featureId: ['', Validators.required],
        })
        this.propertyFeatureAddForm.setForm(this.form);
        
        this.properties$ = this.propertyStateService.listenToChanges();
        this.properties$.subscribe((data: Property[]) => {
            this.propertiesSelect = data.map(property => ({
                name: property.id,
                code: property.id
            }));
        });
        
        this.additionalFeatures$ = this.additionalFeatureStateService.listenToChanges();
        this.additionalFeatures$.subscribe((data: AdditionalFeature[]) => {
            this.featuresSelect = data.map(item => ({
                name: item.feature,
                code: item.id
            }));
        });
    }
    
    postForm(){
        this.propertyFeatureAddForm.validForm();
        const data: AdditionalFeatureCreate = this.form.value;
        this.propertyService.saveFeatureProperty(data).subscribe({
            next: (res: any) => {    
                this.propertyFeatureAddForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyFeatureAddForm.failCaseState(errors);
            }
        });
    }
}
