import { Component, inject, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { SelectItem, SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PropertyStateService } from '../../../../../../../core/states/property-state.service';
import { Property } from '../../../../../../../shared/interfaces/property';
import { CreateContractComponent } from '../../create-contract.component';

@Component({
    selector: 'app-select-property',
    imports: [ReactiveFormsModule, DataView, Tag, SelectModule, ButtonModule, CommonModule, SelectButton, FormsModule],
    templateUrl: './select-property.component.html',
    styleUrl: './select-property.component.scss'
})

export class SelectPropertyComponent implements OnInit {
    form!: FormGroup;
    
    layout: any = 'grid';
    options = ['list', 'grid'];
    sortOptions!: {label: string, value: string}[];
    sortOrder!: number;
    sortField!: string;
    sortKey: any;
    
    protected properties$ = new Observable<Property[]>();
    properties : Property[] = [];
    
    private formContainer = inject(CreateContractComponent);
    constructor(private propertyStateService: PropertyStateService){
        this.propertyStateService.loadProperties();
    }
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep1Form();
        
        this.getPropertys();
        this.properties$.subscribe((data: Property[]) => {
            this.properties = data;
        });
        
        this.sortOptions = [
            { label: 'Preço: Menor para Maior', value: 'priceAsc' },
            { label: 'Preço: Maior para Menor', value: 'priceDesc' },
            { label: 'Tipo: A-Z', value: 'typeAsc' },
            { label: 'Tipo: Z-A', value: 'typeDesc' },
            { label: 'Bairro: A-Z', value: 'districtAsc' },
            { label: 'Bairro: Z-A', value: 'districtDesc' }
        ];
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
    
    getPropertys(){
        this.properties$ = this.propertyStateService.listenToChanges();
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
    
    getType(status: number) {
        switch (status) {
            case 1:
            return 'Casa';
            case 2:
            return 'Apartamento';
            case 3:
            return 'Lote';
            default:
            return 'Outros';
        }
    }
    
    getStatus(status: number) {
        switch (status) {
            case 1:
            return 'Livre';
            case 2:
            return 'Ocupado';
            case 3:
            return 'Reservado';
            default:
            return 'Outros';
        }
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            residence: {
                id: idSelected
            }
        });
    }
}
