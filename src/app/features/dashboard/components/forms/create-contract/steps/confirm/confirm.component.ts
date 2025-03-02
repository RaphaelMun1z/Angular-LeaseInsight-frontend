import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreateContractComponent } from '../../create-contract.component';
import { ContractService } from '../../../../../../../core/services/contract.service';
import { PropertyStateService } from '../../../../../../../core/states/property-state.service';
import { ClientStateService } from '../../../../../../../core/states/client-state.service';
import { ContractCreate } from '../../../../../../../shared/interfaces/contract';
import { Property } from '../../../../../../../shared/interfaces/property';
import { Client } from '../../../../../../../shared/interfaces/client';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormHandler } from '../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../core/services/stepped-forms/contract-form.service';
import { Router } from '@angular/router';
import { FormErrorsComponent } from '../../../../../../../shared/components/form-errors/form-errors.component';

@Component({
    selector: 'app-confirm',
    imports: [DividerModule, ImageModule, FormErrorsComponent, FieldsetModule, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})

export class ConfirmComponent implements OnInit{
    form!: FormGroup;
    contractCreateForm!: FormHandler;
    
    protected property$ = new Observable<Property | null>();
    property! : Property;
    
    protected client$ = new Observable<Client | null>();
    client!: Client;
    
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
        this.property$ = this.propertyStateService.listenToProperty();
        this.property$.subscribe((data: Property | null) => {
            if(data){
                this.property = data;
            }
        });
        
        this.client$ = this.clientStateService.listenToClient();
        this.client$.subscribe((data: Client | null) => {
            if(data){
                this.client = data;
            }
        });
    }
    
    postForm(){
        this.contractCreateForm.validForm();
        const data: ContractCreate = this.form.value;
        this.contractService.saveContract(data).subscribe({
            next: (res: any) => {    
                this.contractCreateForm.successCaseState();
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
}
