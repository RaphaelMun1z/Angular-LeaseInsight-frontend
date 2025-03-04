import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PropertyAddressStateService } from '../../../../../../core/states/property-address-state.service';
import { PropertyAddressService } from '../../../../../../core/services/propertyAddress.service';
import { PropertyAddress, PropertyAddressUpdate } from '../../../../../../shared/interfaces/propertyAddress';
import { countries } from '../../../../../../shared/utils/ConstLists';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputSelectComponent } from '../../../../../../shared/components/input/input-select/input-select.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../../shared/components/input/input-mask/input-mask.component';
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
    selector: 'app-update-property-address',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputTextComponent, InputMaskComponent, InputSelectComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-property-address.component.html',
    styleUrl: './update-property-address.component.scss'
})

export class UpdatePropertyAddressComponent implements OnInit {
    propertyAddressUpdateForm = new FormHandler("property-address-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Endereço', route: '/dashboard/imoveis/enderecos' }, { label: 'Atualizar', route: '/dashboard/imoveis/enderecos/atualizar' }];
    protected form!: UntypedFormGroup;
    
    countriesList = countries;
    currentId!: string;
    propertyAddress! : PropertyAddress;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyAddressService = inject(PropertyAddressService);
    private propertyAddressStateService = inject(PropertyAddressStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.propertyAddressStateService.loadPropertyAddress(this.currentId).subscribe({
                next: (propertyAddress: PropertyAddress | null) => {
                    if(propertyAddress){
                        this.form.patchValue({
                            street: propertyAddress.street,
                            district: propertyAddress.district,
                            city: propertyAddress.city,
                            state: propertyAddress.state,
                            country: propertyAddress.country,
                            cep: propertyAddress.cep,
                            complement: propertyAddress.complement,
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/imoveis/enderecos']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            street: [''],
            district: [''],
            city: [''],
            state: [''],
            country: [''],
            cep: [''],
            complement: [''],
        })
        this.propertyAddressUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.propertyAddressUpdateForm.validForm();
        const data: PropertyAddressUpdate = this.form.value;
        this.propertyAddressService.patchPropertyAddress(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.propertyAddressUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/imoveis/enderecos']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyAddressUpdateForm.failCaseState(errors);
            }
        });
    }
}