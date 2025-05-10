import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ContractService } from '../../../../../../../../core/services/contract.service';
import { PropertyStateService } from '../../../../../../../../core/states/property-state.service';
import { ClientStateService } from '../../../../../../../../core/states/client-state.service';
import { ContractCreate } from '../../../../../../../../shared/interfaces/contract';
import { Property } from '../../../../../../../../shared/interfaces/property';
import { Client } from '../../../../../../../../shared/interfaces/client';

import { FormHandler } from '../../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../../core/services/stepped-forms/contract-form.service';
import { FormErrorsComponent } from '../../../../../../../../shared/components/form-errors/form-errors.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-confirm',
    imports: [DividerModule, ImageModule, FormErrorsComponent, FieldsetModule, GalleriaModule, FieldsetModule, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})

export class ConfirmComponent implements OnInit{
    form!: FormGroup;
    contractCreateForm!: FormHandler;
    
    protected property$ = new Observable<Property | null>();
    property! : Property;
    
    client!: Client;
    
    imageUrls$ = new BehaviorSubject<{ itemImageSrc: string; thumbnailImageSrc: string; alt: string; }[]>([]);
    
    displayCustom: boolean | undefined;
    activeIndex: number = 0;
    
    router = inject(Router);
    private contractFormService = inject(ContractFormService);
    private contractService = inject(ContractService);
    private propertyStateService = inject(PropertyStateService);
    private clientStateService = inject(ClientStateService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    
    constructor() {
        this.contractCreateForm = this.contractFormService.getFormHandler();
        this.form = this.contractCreateForm.getForm();
        
        if(this.form.get('step1.residence.id')?.value){
            this.propertyStateService.loadProperty(this.form.get('step1.residence.id')?.value);
        }
        
        if(this.form.get('step2.tenant.id')?.value){
            this.clientStateService.loadClient(this.form.get('step2.tenant.id')?.value);
        }
    }
    
    ngOnInit(): void {
        const residenceId = this.form.get('step1.residenceId')?.value; 
        this.propertyStateService.loadProperty(residenceId).subscribe({
            next: (property: Property | null) => {
                this.property = property!!;
                this.updateImageUrls();
            },
            error: () => {
                console.log("Erro!")
            }
        })
        
        const tenantId = this.form.get('step2.tenantId')?.value;
        this.clientStateService.loadClient(tenantId).subscribe({
            next: (client: Client | null) => {
                this.client = client!!;
            },
            error: () => {
                console.log("Erro!")
            }
        })
    }
    
    postForm(){
        this.messageService.add({ severity: 'success', summary: 'Operação realizada', detail: 'Contrato cadastrado com sucesso!' });
        this.router.navigate(['/dashboard/contratos']);
        return;
        
        this.contractCreateForm.validForm();
        const data: ContractCreate = this.contractFormService.formatData();
        this.contractService.saveContract(data).subscribe({
            next: (res: any) => {    
                this.contractCreateForm.successCaseState();
                this.messageService.add({ severity: 'success', summary: 'Operação realizada', detail: 'Contrato cadastrado com sucesso!' });
                this.router.navigate(['/dashboard/contratos']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.contractCreateForm.failCaseState(errors);
            }
        });
    }
    
    registrationConfirmation(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Você tem certeza que deseja cadastrar o contrato?',
            header: 'Confirmação',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Salvar',
            },
            accept: () => {
                this.postForm();
                this.messageService.add({ severity: 'info', summary: 'Salvando', detail: 'Processando Cadastro de Contrato...' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Cancelado',
                    detail: 'Você Cancelou o Cadastro do Contrato',
                    life: 3000,
                });
            },
        });
    }
    
    deletionConfirmation(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },
            
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
    
    updateImageUrls(): void {
        const images = this.property.files;
        if (!images || typeof images !== 'object') {
            this.imageUrls$.next([]);
            return;
        }
        
        if(!Array.isArray(images)) return;
        
        const imagesArray = images as unknown as (File | string)[];
        
        const urls = images.map((file: File | { path: string }) => ({
            itemImageSrc: file instanceof File ? URL.createObjectURL(file) : file.path,
            thumbnailImageSrc: file instanceof File ? URL.createObjectURL(file) : file.path,
            alt: "Imagem do imóvel",
            title: "Imagem do imóvel"
        }));
        
        this.imageUrls$.next(urls);
    }
    
    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
