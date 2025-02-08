import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PropertyAddressCreate } from '../../../../../shared/interfaces/propertyAddress';
import { PropertyAddressService } from '../../../../../core/services/propertyAddress.service';
import { CepService } from '../../../../../core/services/cep.service';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from "../../../../../shared/components/input/input-mask/input-mask.component";

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { MenuItem, MessageService } from 'primeng/api';
import { InputSelectComponent } from "../../../../../shared/components/input/input-select/input-select.component";

@Component({
    selector: 'app-create-property-address',
    imports: [FormStorageDirective, RouterModule, InputTextComponent, Breadcrumb, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, InputMaskComponent, InputSelectComponent],
    templateUrl: './create-property-address.component.html',
    styleUrl: './create-property-address.component.scss'
})

export class CreatePropertyAddressComponent implements OnInit {
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    listIems = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    breadCrumbItems: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    private messageService = inject(MessageService);
    private cepService = inject(CepService);
    private formBuilderService = inject(UntypedFormBuilder);
    private propertyAddressService = inject(PropertyAddressService);
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        this.breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Imóveis', route: '/dashboard/imoveis' }, { label: 'Endereço', route: '/dashboard/imoveis/endereco/criar' }, { label: 'Formulário', route: '/dashboard/imoveis/endereco/criar' }];
        this.listenToCepInput();
    }
    
    protected form = this.formBuilderService.group({
        street: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        cep: ['', Validators.required],
        complement: [''],
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        this.form.patchValue({ country: this.form.value.country.name})
        const formValue = this.form.value;
        this.postPropertyAddress(formValue);
    }
    
    postPropertyAddress(propertyAddress: PropertyAddressCreate){
        this.propertyAddressService.savePropertyAddress(propertyAddress).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                this.cleanForm();
                setTimeout(() => {
                    localStorage.removeItem("property-address-form");
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
    
    getAddress(cepNumber: string){
        this.cepService.getAddressByCep(cepNumber).subscribe({
            next: (data) => {
                if(!data.erro){
                    this.form.patchValue({
                        street: data.logradouro,
                        district: data.bairro,
                        city: data.localidade,
                        state: data.estado
                    })
                }else{
                    this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'CEP inválido', life: 3000 });
                }
            },
            error: (err) => {
                console.error('Erro ao buscar endereço: ', err);
            }
        });
    }
    
    listenToCepInput(){
        this.form.get('cep')?.valueChanges.subscribe(value => {
            if(value.replace(/[._-]/g, "")?.length == 8){
                this.getAddress(value.replace(/[._-]/g, ""));
            }
        })
    }
}