import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { FormStorageDirective } from '../../../../../shared/directives/form-storage.directive';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdditionalFeatureCreate } from '../../../../../shared/interfaces/additionalFeature';
import { AdditionalFeatureService } from '../../../../../core/services/additionalFeature.service';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../shared/components/input/input-text/input-text.component';

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
import { OwnerCreate } from '../../../../../shared/interfaces/owner';
import { OwnerService } from '../../../../../core/services/owner.service';
import { InputMaskComponent } from '../../../../../shared/components/input/input-mask/input-mask.component';

@Component({
    selector: 'app-create-owner',
    imports: [FormStorageDirective, RouterModule, InputTextComponent, InputMaskComponent, Breadcrumb, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-owner.component.html',
    styleUrl: './create-owner.component.scss'
})

export class CreateOwnerComponent implements OnInit {
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];

    breadCrumbItems: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private ownerService = inject(OwnerService);
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        this.breadCrumbItems = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Proprietários', route: '/dashboard/proprietarios' }, { label: 'Cadastrar', route: '/dashboard/proprietarios/criar' }, { label: 'Formulário' }];
    }
    
    protected form = this.formBuilderService.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        password: ['']
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        const formValue = this.form.value;
        this.postOwner(formValue);
    }
    
    postOwner(owner: OwnerCreate){
        this.ownerService.saveOwner(owner).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                this.cleanForm();
                setTimeout(() => {
                    localStorage.removeItem("owner-form");
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