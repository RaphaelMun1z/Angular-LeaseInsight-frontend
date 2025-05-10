import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Property, PropertyMinimal } from '../../../interfaces/property';
import { PropertyService } from '../../../../core/services/property.service';
import { Observable, take } from 'rxjs';
import { propertyType } from '../../../utils/ConstLists';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PropertyStateService } from '../../../../core/states/property-state.service';

@Component({
    selector: 'app-property-minimal-alt',
    imports: [CommonModule, AvatarModule, ButtonModule, TagModule, RouterModule, GalleriaModule, ImageModule, ConfirmPopupModule, ToastModule ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './property-minimal-alt.component.html',
    styleUrl: './property-minimal-alt.component.scss'
})

export class PropertyMinimalAltComponent implements OnChanges {
    @Input() propertyMinimal! : Property;
    selectedId!: string;
    frontImage: string | null = null;
    loadingImages: boolean = true;
    
    responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];
    
    constructor(private service: PropertyService, private stateService: PropertyStateService, private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['propertyMinimal'] && changes['propertyMinimal'].currentValue) {
            this.loadingImages = true;
            this.frontImage = null;
            if('files' in this.propertyMinimal && this.propertyMinimal.files.length > 0){
                const imageName = this.propertyMinimal.files[0].name;
                this.uploadedImage(imageName).subscribe({
                    next: (imageUrl: string) => {
                        setTimeout(() => {
                            this.frontImage = imageUrl;
                            this.loadingImages = false;
                        }, 2000)
                    },
                    error: (err: any) => {
                        this.loadingImages = false;
                    }
                })
            }else{
                this.loadingImages = false;
            }
        }
    }
    
    uploadedImage(fileName: string): Observable<string> {
        return new Observable<string>((observer) => {
            this.service.getPropertyImageByImageName(fileName).subscribe({
                next: (res: Blob) => {
                    const imageUrl = URL.createObjectURL(res);
                    observer.next(imageUrl);
                    observer.complete();
                }
            });
        });
    }
    
    getPropertyType(type: string) {
        return propertyType.find(item => item.code === type)?.name || "Não foi possível carregar!";
    }
    
    getTagSeverity(propertyType: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        switch(propertyType) {
            case 'CASA':
            return 'success'; 
            case 'APARTAMENTO':
            return 'info';    
            case 'COMERCIAL':
            return 'warn'; 
            case 'TERRENO':
            return 'contrast'; 
            case 'RURAL':
            return 'danger';  
            default:
            return 'secondary'; 
        }
    }
    
    getType(type: string) {
        switch (type) {
            case "HOUSE":
            return 'Casa';
            case "APARTMENT":
            return 'Apartamento';
            case "CONDO":
            return 'Lote';
            default:
            return 'Outros';
        }
    }
    
    confirmDelete(event: Event, propertyId: string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Tem certeza que deseja excluir este imóvel?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Excluir',
                severity: 'danger'
            },
            accept: () => {
                this.deleteProperty(propertyId);
            }
        });
    }
    
    deleteProperty(propertyId: string) {
        this.service.deleteProperty(propertyId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Imóvel excluído com sucesso!'
                });
                this.stateService.removeProperty(propertyId);
            },
            error: (err: any) => {
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: err.message 
                });
            },
            complete: () => {
                console.log("Complete")
            }
        });
    }
}
