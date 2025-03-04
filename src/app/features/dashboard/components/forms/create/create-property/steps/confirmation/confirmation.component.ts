import { Component, inject, OnInit, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { PropertyFormService } from '../../../../../../../../core/services/stepped-forms/property-form.service';
import { PropertyService } from '../../../../../../../../core/services/property.service';
import { PropertyAddressStateService } from '../../../../../../../../core/states/property-address-state.service';
import { OwnerStateService } from '../../../../../../../../core/states/owner-state.service';
import { FormErrorsComponent } from '../../../../../../../../shared/components/form-errors/form-errors.component';
import { FormHandler } from '../../../../../../../../shared/utils/FormHandler';
import { PropertyAddress } from '../../../../../../../../shared/interfaces/propertyAddress';
import { Property } from '../../../../../../../../shared/interfaces/property';
import { Owner } from '../../../../../../../../shared/interfaces/owner';
import { propertyType, occupancyStatus } from '../../../../../../../../shared/utils/ConstLists';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirmation',
    imports: [DividerModule, ImageModule, FieldsetModule, GalleriaModule, FormErrorsComponent, AvatarModule, CommonModule, ConfirmDialog, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './confirmation.component.html',
    styleUrl: './confirmation.component.scss'
})

export class ConfirmationComponent  implements OnInit{
    form!: FormGroup;
    propertyCreateForm!: FormHandler;
    
    currentPropertyType!: string | undefined;
    currentOccupancyStatus!: string | undefined;
    imageUrls$ = new BehaviorSubject<{ itemImageSrc: string; thumbnailImageSrc: string; alt: string; }[]>([]);
    
    protected property$ = new Observable<Property | null>();
    property! : Property;
    
    protected address$ = new Observable<PropertyAddress | null>();
    address!: PropertyAddress;
    
    protected owner$ = new Observable<Owner | null>();
    owner!: Owner;
    
    displayCustom: boolean | undefined;
    activeIndex: number = 0;
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    
    router = inject(Router);
    private propertyFormService = inject(PropertyFormService);
    private propertyService = inject(PropertyService);
    private propertyAddressStateService = inject(PropertyAddressStateService);
    private ownerStateService = inject(OwnerStateService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    
    constructor() {
        this.propertyCreateForm = this.propertyFormService.getFormHandler();
        this.form = this.propertyCreateForm.getForm();
        
        this.currentPropertyType = this.getPropertyNameByCode(propertyType, this.form.get('step1.propertyType')?.value);
        this.currentOccupancyStatus = this.getPropertyNameByCode(occupancyStatus, this.form.get('step1.occupancyStatus')?.value);
        
        if(this.form.get('step2.residenceAddress')?.value){
            this.propertyAddressStateService.loadPropertyAddress(this.form.get('step2.residenceAddress')?.value);
        }
        
        if(this.form.get('step3.owner')?.value){
            this.ownerStateService.loadOwner(this.form.get('step3.owner')?.value);
        }
    }
    
    ngOnInit(): void {
        this.propertyAddressStateService.loadPropertyAddress(this.form.get('step2.residenceAddress.id')?.value).subscribe({
            next: (address: PropertyAddress | null) => {
                this.address = address!!;
            },
            error: () => {
                console.log("Erro!")
            }
        })
        
        this.ownerStateService.loadOwner(this.form.get('step2.tenant.id')?.value).subscribe({
            next: (owner: Owner | null) => {
                this.owner = owner!!;
            },
            error: () => {
                console.log("Erro!")
            }
        })
        
        this.updateImageUrls();
    }
    
    postForm(){
        this.propertyCreateForm.validForm();
        const data: FormData = this.ToFormData();
        this.propertyService.saveProperty(data).subscribe({
            next: (res: any) => {    
                this.propertyCreateForm.successCaseState();
                this.router.navigate(['/imoveis']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.propertyCreateForm.failCaseState(errors);
            }
        });
    }
    
    ToFormData(): FormData {
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
        if (files && typeof files === 'object') {
            Object.values(files).forEach((fileList: any) => {
                if (Array.isArray(fileList)) {
                    fileList.forEach((file: File) => {
                        if (file instanceof File) {
                            formData.append('images', file, file.name);
                        }
                    });
                }
            });
        }
        
        return formData;
    }
    
    registrationConfirmation(event: Event) {
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
                this.postForm();
                this.messageService.add({ severity: 'info', summary: 'Salvando', detail: 'Processando Cadastro de Imóvel...' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Cancelado',
                    detail: 'Você Cancelou o Cadastro da Propriedade',
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
    
    getPropertyNameByCode(array: {name: string;code: string;}[], code: string): string | undefined {
        const obj = array.find(item => item.code === code);
        return obj ? obj.name : undefined;
    }
    
    updateImageUrls(): void {
        const images = this.form.get('step1.images')?.value;
        if (!images || typeof images !== 'object') {
            this.imageUrls$.next([]);
            return;
        }
        
        const urls = Object.values(images).flatMap((fileList: any) => {
            if (!Array.isArray(fileList)) return [];
            return fileList.map((file: File | string) => ({
                itemImageSrc: file instanceof File ? URL.createObjectURL(file) : file,
                thumbnailImageSrc: file instanceof File ? URL.createObjectURL(file) : file,
                alt: "Imagem do imóvel",
                title: "Imagem do imóvel"
            }));
        });
        
        this.imageUrls$.next(urls);
    }
    
    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}