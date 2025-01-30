import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateContractComponent } from '../../create-contract.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';
import { PropertyStateService } from '../../../../../../../core/states/property-state.service';
import { Property } from '../../../../../../../shared/interfaces/property';
import { Observable } from 'rxjs';
import { ContractCreate } from '../../../../../../../shared/interfaces/contract';
import { ContractService } from '../../../../../../../core/services/contract.service';

@Component({
    selector: 'app-confirm',
    imports: [DividerModule, Message, FieldsetModule, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})

export class ConfirmComponent implements OnInit{
    form!: FormGroup;
    protected property$ = new Observable<Property | null>();
    property! : Property;
    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    private formContainer = inject(CreateContractComponent);
    private contractService = inject(ContractService);
    
    constructor(private propertyStateService: PropertyStateService, private confirmationService: ConfirmationService, private messageService: MessageService) {
        this.form = this.formContainer.getAllSteps();
        console.log(this.form.value)
        if(this.form.get('step1.residence.id')?.value){
            this.propertyStateService.loadProperty(this.form.get('step1.residence.id')?.value);
        }
    }
    
    ngOnInit(): void {
        this.getProperty();
        this.property$.subscribe((data: Property | null) => {
            if(data){
                this.property = data;
            }
        });
    }
    
    getProperty(){
        this.property$ = this.propertyStateService.listenToProperty();
    }
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        const formValue = this.form.value;
        console.log(formValue);
        //this.postContract(formValue);
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
