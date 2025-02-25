import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormCreate } from '../../../../../shared/utils/FormCreateClass';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { PropertyAddressCreate } from '../../../../../shared/interfaces/propertyAddress';
import { PropertyAddressService } from '../../../../../core/services/propertyAddress.service';
import { countries } from '../../../../../shared/utils/ConstLists';
import { CepHandler } from '../../../../../shared/utils/CepHandler';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from "../../../../../shared/components/input/input-mask/input-mask.component";
import { InputSelectComponent } from "../../../../../shared/components/input/input-select/input-select.component";
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from "../../../../../shared/components/form-errors/form-errors.component";

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-property-address',
    imports: [FormStorageDirective, BreadcrumbComponent, InputTextComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, InputMaskComponent, InputSelectComponent, FormErrorsComponent],
    templateUrl: './create-property-address.component.html',
    styleUrl: './create-property-address.component.scss'
})

export class CreatePropertyAddressComponent implements OnInit {
    propertyAddressCreateForm = new FormCreate("property-address-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Endereço', route: '/dashboard/imoveis/endereco/criar' }, { label: 'Cadastrar', route: '/dashboard/imoveis/endereco/criar' }];
    protected form!: UntypedFormGroup;

    countriesList = countries;
    addressByCep = new CepHandler();
    
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyAddressService = inject(PropertyAddressService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            street: ['', Validators.required],
            district: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            cep: ['', Validators.required],
            complement: [''],
        })

        this.propertyAddressCreateForm.setForm(this.form);
        this.listenToCepInput();
    }
    
    postForm(){
        this.propertyAddressCreateForm.validForm();
        const data: PropertyAddressCreate = this.form.value;
        this.propertyAddressService.savePropertyAddress(data).subscribe({
            next: (res: any) => {    
                this.propertyAddressCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyAddressCreateForm.failCaseState(errors);
            }
        });
    }
    
    listenToCepInput(){
        this.form.get('cep')?.valueChanges.subscribe(value => {
            if(value && value.replace(/[._-]/g, "")?.length == 8){
                this.addressByCep.setAddress(value.replace(/[._-]/g, ""));
                this.form.patchValue({
                    street: this.addressByCep.getStreet(),
                    district: this.addressByCep.getDistrict(),
                    city: this.addressByCep.getCity(),
                    state: this.addressByCep.getState()
                })
            }
        })
    }
}