import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { AdditionalFeature, AdditionalFeatureCreate } from '../../../../../shared/interfaces/additionalFeature';
import { AdditionalFeatureStateService } from '../../../../../core/states/additional-feature.service';
import { PropertyStateService } from '../../../../../core/states/property-state.service';
import { PropertyService } from '../../../../../core/services/property.service';
import { Property } from '../../../../../shared/interfaces/property';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../shared/components/input/input-select/input-select.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-property-feature-add',
    imports: [FormStorageDirective, RouterModule, InputSelectComponent, Breadcrumb, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-property-feature-add.component.html',
    styleUrl: './create-property-feature-add.component.scss'
})

export class CreatePropertyFeatureAddComponent implements OnInit {
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    breadCrumbItems: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    propertiesSelect!: { name: string, code: string | number }[];
    featuresSelect!: { name: string, code: string | number }[];
    
    protected properties$ = new Observable<Property[]>();
    properties : Property[] = [];

    protected additionalFeatures$ = new Observable<AdditionalFeature[]>();
    additionalFeatures : AdditionalFeature[] = [];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyService = inject(PropertyService);
    constructor(private propertyStateService: PropertyStateService, private additionalFeatureStateService: AdditionalFeatureStateService){
        this.propertyStateService.loadProperties();
        this.additionalFeatureStateService.loadAdditionalFeatures();
    }
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        this.breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Característica', route: '/dashboard/imoveis/caracteristicas' }, { label: 'Adicionar', route: '/dashboard/imoveis/caracteristicas/adicionar' }, { label: 'Formulário', route: '/dashboard/imoveis/caracteristicas/criar' }];
        
        this.getProperties();
        this.properties$.subscribe((data: Property[]) => {
            this.propertiesSelect = data.map(property => ({
                name: property.id,
                code: property.id
            }));
        });

        this.getAdditionalFeatures();
        this.additionalFeatures$.subscribe((data: AdditionalFeature[]) => {
            this.featuresSelect = data.map(item => ({
                name: item.feature,
                code: item.id
            }));
        });
    }
    
    getProperties(){
        this.properties$ = this.propertyStateService.listenToChanges();
    }
    
    getAdditionalFeatures(){
        this.additionalFeatures$ = this.additionalFeatureStateService.listenToChanges();
    }
    
    protected form = this.formBuilderService.group({
        property: this.formBuilderService.group({
            id: ['', Validators.required]
        }),
        feature: this.formBuilderService.group({
            id: ['', Validators.required]
        }),
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        const formValue = this.form.value;
        console.log(JSON.stringify(formValue, null, 2));
        this.postImplementAdditionalFeature(formValue);
    }
    
    postImplementAdditionalFeature(additionalFeature: AdditionalFeatureCreate){
        this.propertyService.saveFeatureProperty(additionalFeature).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                this.cleanForm();
                setTimeout(() => {
                    localStorage.removeItem("property-feature-add-form");
                }, 500)
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                try {
                    if(err['status'] == '422'){
                        this.errors = {"erros": err['message']};
                    }else{
                        this.errors = err;
                    }
                } catch (error) {
                    this.errors = { "Erro": "Ocorreu um erro inesperado! Tente novamente mais tarde." };
                }
                
                this.updateErrorList(); 
            }
        });
    }
    
    updateErrorList() {
        this.errorList = Object.entries(this.errors).map(([field, message]) => ({
            field,
            message
        }));
    }
    
    cleanForm(){
        this.form.reset();
    }
}
