import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CreatePropertyComponent } from '../../create-property.component';
import { PropertyAddressStateService } from '../../../../../../../core/states/property-address-state.service';
import { PropertyAddress } from '../../../../../../../shared/interfaces/propertyAddress';
import { InputTextComponent } from '../../../../../../../shared/components/input/input-text/input-text.component';
import { InputNumberComponent } from '../../../../../../../shared/components/input/input-number/input-number.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { Button, ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-select-address',
    imports: [CommonModule, InputTextComponent, Button, InputIconModule, IconFieldModule, TableModule, InputNumberComponent, FormsModule, ReactiveFormsModule, TagModule, ButtonModule, InputTextModule, MultiSelectModule, SelectModule],
    templateUrl: './select-address.component.html',
    styleUrl: './select-address.component.scss'
})

export class SelectAddressComponent implements OnInit {
    form!: FormGroup;
    
    @ViewChild('dt') dt!: Table;
    loading: boolean = true;
    protected addresses$ = new Observable<PropertyAddress[]>();
    addresses : PropertyAddress[] = [];
    
    router = inject(Router);
    private formContainer = inject(CreatePropertyComponent);
    constructor(private propertyAddressStateService: PropertyAddressStateService){
        this.propertyAddressStateService.loadPropertyAddresses();
    }
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep2Form();
        
        this.getPropertyAddresses();
        this.addresses$.subscribe((data: PropertyAddress[]) => {
            this.addresses = data;
            this.loading = false;
        });
    }
    
    getPropertyAddresses(){
        this.addresses$ = this.propertyAddressStateService.listenToChanges();
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            residenceAddress: idSelected
        });
        this.router.navigate(['/dashboard/imoveis/criar/selecionar-proprietario']);
    }
}