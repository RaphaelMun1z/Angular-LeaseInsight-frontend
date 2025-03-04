import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { Property, PropertyUpdate } from '../../../../../../shared/interfaces/property';
import { PropertyService } from '../../../../../../core/services/property.service';
import { PropertyStateService } from '../../../../../../core/states/property-state.service';
import { occupancyStatus, propertyType } from '../../../../../../shared/utils/ConstLists';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputTextareaComponent } from '../../../../../../shared/components/input/input-textarea/input-textarea.component';
import { InputNumberComponent } from '../../../../../../shared/components/input/input-number/input-number.component';
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
    selector: 'app-update-property',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputTextareaComponent, InputNumberComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-property.component.html',
    styleUrl: './update-property.component.scss'
})

export class UpdatePropertyComponent implements OnInit {
    propertyUpdateForm = new FormHandler("property-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Atualizar', route: '/dashboard/imoveis/atualizar' }];
    protected form!: UntypedFormGroup;
    
    propertyTypeOptions = propertyType;
    occupancyStatusOptions = occupancyStatus;
    currentId!: string;
    property! : Property;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyService = inject(PropertyService);
    private propertyStateService = inject(PropertyStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.propertyStateService.loadProperty(this.currentId).subscribe({
                next: (property: Property | null) => {
                    if(property){
                        this.form.patchValue({
                            description: property.description,
                            numberBedrooms: property.numberBedrooms,
                            numberBathrooms: property.numberBathrooms,
                            numberSuites: property.numberSuites,
                            totalArea: property.totalArea,
                            builtArea: property.builtArea,
                            garageSpaces: property.garageSpaces,
                            yearConstruction: property.yearConstruction,
                            propertyType: property.propertyType,
                            occupancyStatus: property.occupancyStatus,
                            marketValue: property.marketValue,
                            rentalValue: property.rentalValue,
                            dateLastRenovation: property.dateLastRenovation
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/imoveis']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            description: [''],
            numberBedrooms: [''],
            numberBathrooms: [''],
            numberSuites: [''],
            totalArea: [''],
            builtArea: [''],
            garageSpaces: [''],
            yearConstruction: [''],
            propertyType: [null],
            occupancyStatus: [null],
            marketValue: [''],
            rentalValue: [''],
            dateLastRenovation: ['']
        })
        this.propertyUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.propertyUpdateForm.validForm();
        const data: PropertyUpdate = this.form.value;
        this.propertyService.patchProperty(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.propertyUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/imoveis']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyUpdateForm.failCaseState(errors);
            }
        });
    }
}
