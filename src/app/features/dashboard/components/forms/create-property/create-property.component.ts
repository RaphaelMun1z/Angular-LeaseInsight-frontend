import { Component, inject, OnInit } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { RouterModule } from '@angular/router';
import { Steps } from 'primeng/steps';

@Component({
    selector: 'app-create-property',
    imports: [RouterModule, Breadcrumb, Steps, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-property.component.html',
    styleUrl: './create-property.component.scss'
})

export class CreatePropertyComponent implements OnInit {
    steps!: MenuItem[];
    breadCrumbItems!: MenuItem[];
    
    private formBuilderService = inject(UntypedFormBuilder);
    //private propertyFormService = inject(PropertyFormService);
    
    ngOnInit() {
        //this.propertyFormService.setForm(this.form);
        this.updateSteps();
        
        this.form.valueChanges.subscribe(() => {
            //this.propertyFormService.updateStepValidation();
        });
        
        //this.propertyFormService.stepValidations$.subscribe(() => {
        //    this.updateSteps();
        //});
        
        this.breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Cadastrar', route: '/dashboard/imoveis/criar' }, { label: 'Formulário' }];
        
        this.steps = [
            { 
                label: 'Características', 
                routerLink: 'caracteristicas', 
                disabled: false 
            },
            { 
                label: 'Selecionar Endereço', 
                routerLink: 'selecionar-endereco', 
                disabled: false
            },
            { 
                label: 'Selecionar Proprietário', 
                routerLink: 'selecionar-proprietario', 
                disabled: false
            },
            { 
                label: 'Confirmação', 
                routerLink: 'confirmacao',
                disabled: false
            },
        ];    
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
                disabled: false
            },
            { 
                label: 'Selecionar Proprietário', 
                routerLink: 'selecionar-proprietario', 
                disabled: false
            },
            { 
                label: 'Confirmação', 
                routerLink: 'confirmacao',
                disabled: false
            },
        ];
    }
    
    protected form = this.formBuilderService.group({
        step1: this.formBuilderService.group({
            propertyType: ['', Validators.required],
            description: ['', Validators.required],
            numberBedrooms: ['', Validators.required],
            numberBathrooms: ['', Validators.required],
            numberSuites: ['', Validators.required],
            totalArea: ['', Validators.required],
            builtArea: ['', Validators.required],
            garageSpaces: ['', Validators.required],
            yearConstruction: ['', Validators.required],
            occupancyStatus: ['', Validators.required],
            marketValue: ['', Validators.required],
            rentalValue: ['', Validators.required],
            dateLastRenovation: ['', Validators.required],
            images: ['', Validators.required]
        }),
        step2: this.formBuilderService.group({
            number: ['', Validators.required],
            complement: ['', Validators.required],
            residenceAddress: ['', Validators.required],
        }),
        step3: this.formBuilderService.group({
            owner: ['', Validators.required],
        })
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