import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatePropertyComponent } from '../../create-property.component';
import { InputTextComponent } from '../../../../../../../shared/components/input/input-text/input-text.component';
import { InputNumberComponent } from '../../../../../../../shared/components/input/input-number/input-number.component';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PropertyAddressStateService } from '../../../../../../../core/states/propertyAddress-state.service';
import { PropertyAddress } from '../../../../../../../shared/interfaces/propertyAddress';
import { Observable } from 'rxjs';
import { Button, ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';

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