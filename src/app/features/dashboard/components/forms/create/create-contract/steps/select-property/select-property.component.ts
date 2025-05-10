import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PropertyStateService } from '../../../../../../../../core/states/property-state.service';
import { Property } from '../../../../../../../../shared/interfaces/property';
import { FormHandler } from '../../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../../core/services/stepped-forms/contract-form.service';
import { propertiesSortOptions, propertyType, occupancyStatus } from '../../../../../../../../shared/utils/ConstLists';

import { SelectButton } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { PropertyService } from '../../../../../../../../core/services/property.service';

@Component({
    selector: 'app-select-property',
    imports: [ReactiveFormsModule, DataView, DividerModule, Tag, SelectModule, ButtonModule, CommonModule, SelectButton, FormsModule],
    templateUrl: './select-property.component.html',
    styleUrl: './select-property.component.scss'
})

export class SelectPropertyComponent implements OnInit {
    form!: FormGroup;
    contractCreateForm!: FormHandler;
    
    sortOptions = propertiesSortOptions;
    layout: any = 'grid';
    options = ['list', 'grid'];
    sortOrder!: number;
    sortField!: string;
    sortKey: any;
    
    protected properties$ = new Observable<Property[]>();
    properties : Property[] = [];
    
    router = inject(Router);
    constructor(private propertyService: PropertyService, private propertyStateService: PropertyStateService) {
        this.propertyStateService.loadProperties();
    }
    
    public contractFormService = inject(ContractFormService);
    
    ngOnInit(): void {
        this.contractCreateForm = this.contractFormService.getFormHandler();
        this.form = this.contractFormService.getStep1Form();
        
        this.properties$ = this.propertyStateService.listenToPropertiesChanges();
        this.properties$.subscribe((data: Property[]) => {
            this.properties = data;
        });     
    }
    
    onSortChange(event: any): void {
        const value = event.value;
        
        switch (value) {
            case 'priceAsc':
            this.properties.sort((a, b) => a.rentalValue - b.rentalValue);
            break;
            
            case 'priceDesc':
            this.properties.sort((a, b) => b.rentalValue - a.rentalValue);
            break;
            
            case 'typeAsc':
            this.properties.sort((a, b) => this.getType(a.propertyType).localeCompare(this.getType(b.propertyType)));
            break;
            
            case 'typeDesc':
            this.properties.sort((a, b) => this.getType(b.propertyType).localeCompare(this.getType(a.propertyType)));
            break;
            
            case 'districtAsc':
            this.properties.sort((a, b) => a.residenceAddress.district.localeCompare(b.residenceAddress.district));
            break;
            
            case 'districtDesc':
            this.properties.sort((a, b) => b.residenceAddress.district.localeCompare(a.residenceAddress.district));
            break;
            
            default:
            break;
        }
    }
    
    getSeverity(product: any) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
            return 'success';
            
            case 'LOWSTOCK':
            return 'warn';
            
            case 'OUTOFSTOCK':
            return 'danger';
            
            default:
            return undefined;
        }
    }
    
    getType(code: string) : string {
        return propertyType.find(property => property.code === code)?.name || "Valor inválido!";;
    }
    
    getStatus(code: string) : string {
        return occupancyStatus.find(status => status.code === code)?.name || "Valor inválido!";;
    } 
    
    handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = 'https://static.vecteezy.com/ti/vetor-gratis/p1/17173007-nao-pode-carregar-ilustracao-de-conceito-de-imagem-corrompida-de-design-plano-eps10-elemento-grafico-moderno-para-pagina-inicial-interface-do-usuario-de-estado-vazio-infografico-icone-vetor.jpg';
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            residenceId: idSelected
        });
        this.router.navigate(['/dashboard/contratos/criar/selecionar-cliente']);
    }
}
