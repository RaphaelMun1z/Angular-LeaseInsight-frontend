import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormHandler } from '../../../../../shared/utils/FormHandler';
import { PropertyFormService } from '../../../../../core/services/stepped-forms/property-form.service';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Steps } from 'primeng/steps';

@Component({
    selector: 'app-create-property',
    imports: [RouterModule, FormStorageDirective, BreadcrumbComponent, Steps, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-property.component.html',
    styleUrl: './create-property.component.scss'
})

export class CreatePropertyComponent implements OnInit {
    propertyCreateForm = new FormHandler("property-form");
    form!: UntypedFormGroup;
    steps!: MenuItem[];
    breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Cadastrar', route: '/dashboard/imoveis/criar' }];
    
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyFormService = inject(PropertyFormService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            step1: this.formBuilderService.group({
                description: ['', Validators.required],
                numberBedrooms: ['', Validators.required],
                numberBathrooms: ['', Validators.required],
                numberSuites: ['', Validators.required],
                totalArea: ['', Validators.required],
                builtArea: ['', Validators.required],
                garageSpaces: ['', Validators.required],
                yearConstruction: ['', Validators.required],
                propertyType: [null, Validators.required],
                occupancyStatus: [null, Validators.required],
                marketValue: ['', Validators.required],
                rentalValue: ['', Validators.required],
                dateLastRenovation: ['', Validators.required],
                images: this.formBuilderService.group({
                    mainFacade: [[], [this.propertyFormService.lengthArray(1, 2)]],  
                    livingRoom: [[], [this.propertyFormService.lengthArray(1, 2)]], 
                    diningRoom: [[], [this.propertyFormService.lengthArray(1, 2)]], 
                    kitchen: [[], [this.propertyFormService.lengthArray(1, 4)]],
                    bedrooms: [[], [this.propertyFormService.lengthArray(1, 4)]],  
                    bathrooms: [[], [this.propertyFormService.lengthArray(1, 4)]],  
                    serviceArea: [[], [this.propertyFormService.lengthArray(1, 2)]],  
                    garage: [[], [this.propertyFormService.lengthArray(1, 2)]],  
                    backyard: [[], [this.propertyFormService.lengthArray(1, 2)]],  
                    interiorDetails: [[], [this.propertyFormService.lengthArray(1, 4)]],
                })
            }),
            step2: this.formBuilderService.group({
                number: ['', Validators.required],
                aptNumber: [null],
                complement: [''],
                residenceAddress: ['', Validators.required],
            }),
            step3: this.formBuilderService.group({
                owner: ['', Validators.required],
            })
        })
        this.propertyCreateForm.setForm(this.form);
        this.propertyFormService.setForm(this.form);
        this.propertyFormService.setFormHandler(this.propertyCreateForm);
        
        this.form.valueChanges.subscribe(() => {
            this.propertyFormService.updateStepValidation();
        });
        
        this.propertyFormService.stepValidations$.subscribe(() => {
            this.updateSteps();
        });
    }
    
    private updateSteps() {
        this.steps = [
            { 
                label: 'Características', 
                routerLink: 'caracteristicas', 
                disabled: false 
            },
            { 
                label: 'Selecionar Endereço', 
                routerLink: 'selecionar-endereco', 
                disabled: !this.propertyFormService.isStepAllowed('selecionar-endereco') 
            },
            { 
                label: 'Selecionar Proprietário', 
                routerLink: 'selecionar-proprietario', 
                disabled: !this.propertyFormService.isStepAllowed('selecionar-proprietario') 
            },
            { 
                label: 'Confirmação', 
                routerLink: 'confirmacao',
                disabled: !this.propertyFormService.isStepAllowed('confirmacao') 
            },
        ];
    }
}