import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreatePropertyComponent } from '../../create-property.component';
import { PropertyService } from '../../../../../../../core/services/property.service';
import { PropertyAddressStateService } from '../../../../../../../core/states/property-address-state.service';
import { OwnerStateService } from '../../../../../../../core/states/owner-state.service';
import { Property, PropertyCreate } from '../../../../../../../shared/interfaces/property';
import { PropertyAddress } from '../../../../../../../shared/interfaces/propertyAddress';
import { Owner } from '../../../../../../../shared/interfaces/owner';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { Message } from 'primeng/message';

@Component({
    selector: 'app-confirmation',
    imports: [DividerModule, ImageModule, Message, FieldsetModule, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './confirmation.component.html',
    styleUrl: './confirmation.component.scss'
})

export class ConfirmationComponent  implements OnInit{
    form!: FormGroup;
    protected property$ = new Observable<Property | null>();
    protected address$ = new Observable<PropertyAddress | null>();
    protected owner$ = new Observable<Owner | null>();
    property! : Property;
    address!: PropertyAddress;
    owner!: Owner;
    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    
    private formContainer = inject(CreatePropertyComponent);
    private propertyService = inject(PropertyService);
    private propertyAddressStateService = inject(PropertyAddressStateService);
    private ownerStateService = inject(OwnerStateService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    
    constructor() {
        this.form = this.formContainer.getAllSteps();
        
        if(this.form.get('step2.residenceAddress')?.value){
            this.propertyAddressStateService.loadPropertyAddress(this.form.get('step2.residenceAddress')?.value);
        }
        
        if(this.form.get('step3.owner')?.value){
            this.ownerStateService.loadOwner(this.form.get('step3.owner')?.value);
        }
    }
    
    ngOnInit(): void {
        this.getAddress();
        this.address$.subscribe((data: PropertyAddress | null) => {
            if(data){
                this.address = data;
            }
        });
        
        this.getOwner();
        this.owner$.subscribe((data: Owner | null) => {
            if(data){
                this.owner = data;
            }
        });
    }
    
    getAddress(){
        this.address$ = this.propertyAddressStateService.listenToPropertyAddress();
    }
    
    getOwner(){
        this.owner$ = this.ownerStateService.listenToClient();
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
        
        const formData = new FormData();
        formData.append('propertyType', this.form.get('step1.propertyType')?.value);
        formData.append('description', this.form.get('step1.description')?.value);
        formData.append('numberBedrooms', this.form.get('step1.numberBedrooms')?.value);
        formData.append('numberBathrooms', this.form.get('step1.numberBathrooms')?.value);
        formData.append('numberSuites', this.form.get('step1.numberSuites')?.value);
        formData.append('totalArea', this.form.get('step1.totalArea')?.value);
        formData.append('builtArea', this.form.get('step1.builtArea')?.value);
        formData.append('garageSpaces', this.form.get('step1.garageSpaces')?.value);
        formData.append('yearConstruction', this.form.get('step1.yearConstruction')?.value);
        formData.append('occupancyStatus', this.form.get('step1.occupancyStatus')?.value);
        formData.append('marketValue', this.form.get('step1.marketValue')?.value);
        formData.append('rentalValue', this.form.get('step1.rentalValue')?.value);
        formData.append('dateLastRenovation', this.form.get('step1.dateLastRenovation')?.value);
        formData.append('number', this.form.get('step2.number')?.value ? this.form.get('step2.number')?.value.toString() : '');
        const aptNumber = this.form.get('step2.aptNumber')?.value;
        formData.append('aptNumber', aptNumber !== null && aptNumber !== '' ? aptNumber.toString() : '');        
        formData.append('complement', this.form.get('step2.complement')?.value);
        formData.append('residenceAddress', this.form.get('step2.residenceAddress')?.value);
        formData.append('owner', this.form.get('step3.owner')?.value);
     
        const files = this.form.get('step1.images')?.value;
        if (files && files.length) {
            files.forEach((file: File) => {
                formData.append('images', file, file.name);
            });
        }
        console.log(formData);
        this.postProperty(formData);
    }
    
    postProperty(property: FormData){
        this.propertyService.saveProperty(property).subscribe({
            next: (res: any) => {    
                this.loading = false;
                this.sendSuccess = true;
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                if((err['status'] == '422') || (err['status'] == '400')){
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
            message: 'Você tem certeza que deseja cadastrar o imóvel?',
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
                this.messageService.add({ severity: 'info', summary: 'Salvando', detail: 'Salvando Imóvel...' });
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