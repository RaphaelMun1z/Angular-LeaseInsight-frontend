import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContractComponent } from '../../create-contract.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';
import { PropertyStateService } from '../../../../../../../core/states/property-state.service';
import { Property } from '../../../../../../../shared/interfaces/property';
import { Observable } from 'rxjs';
import { ContractCreate } from '../../../../../../../shared/interfaces/contract';
import { ContractService } from '../../../../../../../core/services/contract.service';
import { Client } from '../../../../../../../shared/interfaces/client';
import { ClientStateService } from '../../../../../../../core/states/client-state.service';

@Component({
    selector: 'app-confirm',
    imports: [DividerModule, ImageModule, Message, FieldsetModule, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})

export class ConfirmComponent implements OnInit{
    form!: FormGroup;
    protected property$ = new Observable<Property | null>();
    protected client$ = new Observable<Client | null>();
    property! : Property;
    client!: Client;
    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    private formContainer = inject(CreateContractComponent);
    private contractService = inject(ContractService);
    private propertyStateService = inject(PropertyStateService);
    private clientStateService = inject(ClientStateService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    
    constructor() {
        this.form = this.formContainer.getAllSteps();
        
        if(this.form.get('step1.residence.id')?.value){
            this.propertyStateService.loadProperty(this.form.get('step1.residence.id')?.value);
        }
        
        if(this.form.get('step2.tenant.id')?.value){
            this.clientStateService.loadClient(this.form.get('step2.tenant.id')?.value);
        }
    }
    
    ngOnInit(): void {
        this.getProperty();
        this.property$.subscribe((data: Property | null) => {
            if(data){
                this.property = data;
            }
        });
        
        this.getClient();
        this.client$.subscribe((data: Client | null) => {
            if(data){
                this.client = data;
            }
        });
    }
    
    getProperty(){
        this.property$ = this.propertyStateService.listenToProperty();
    }
    
    getClient(){
        this.client$ = this.clientStateService.listenToClient();
    }
    
    getInvalidFields(formGroup: FormGroup, parentKey = ''): { [key: string]: string } {
        return Object.keys(formGroup.controls).reduce((invalidFields, key) => {
            const control = formGroup.get(key);
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            
            if (control instanceof FormGroup) {
                Object.assign(invalidFields, this.getInvalidFields(control, fullKey));
            } else if (control?.invalid) {
                invalidFields[fullKey] = 'Campo inválido';
            }
            
            return invalidFields;
        }, {} as { [key: string]: string });
    }
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            this.errors = this.getInvalidFields(this.form);
            this.updateErrorList(); 
            return;
        }
        
        this.loading = true;
        
        const contractData: ContractCreate = {
            residence: {
                id: this.form.get('step1.residence.id')?.value
            },
            tenant: {
                id: this.form.get('step2.tenant.id')?.value
            },
            contractStartDate: this.form.get('step3.contractStartDate')?.value,
            contractEndDate: this.form.get('step3.contractEndDate')?.value,
            defaultRentalValue: this.form.get('step3.defaultRentalValue')?.value,
            contractStatus: this.form.get('step3.contractStatus')?.value,
            invoiceDueDate: this.form.get('step3.invoiceDueDate')?.value,
        };
        console.log(JSON.stringify(contractData, null, 2));
        this.postContract(contractData);
    }
    
    postContract(contract: ContractCreate){
        this.contractService.saveContract(contract).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                if((err['status'] == '422')){
                    this.errors = {"erros": err['message']};
                }else{
                    this.errors = err;
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
    
    confirm1(event: Event) {
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
                this.submit();
                this.messageService.add({ severity: 'info', summary: 'Salvando', detail: 'Salvando Contrato...' });
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
    
    confirm2(event: Event) {
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
