import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PropertyFormService } from '../../../../../../../core/services/stepped-forms/property-form.service';
import { OwnerStateService } from '../../../../../../../core/states/owner-state.service';
import { Owner } from '../../../../../../../shared/interfaces/owner';

import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-select-owner',
    imports: [TableModule, TagModule, ButtonModule, FormsModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    templateUrl: './select-owner.component.html',
    styleUrl: './select-owner.component.scss'
})

export class SelectOwnerComponent implements OnInit {
    form!: FormGroup;
    
    @ViewChild('dt') dt!: Table;
    loading: boolean = true;
    protected owners$ = new Observable<Owner[]>();
    owners : Owner[] = [];
    
    router = inject(Router);
    private propertyFormService = inject(PropertyFormService);
    private ownerStateService = inject(OwnerStateService);
    constructor(){
        this.ownerStateService.loadOwners();
    }
    
    ngOnInit() {
        this.form = this.propertyFormService.getStep3Form();
        
        this.owners$ = this.ownerStateService.listenToChanges();
        this.owners$.subscribe((data: Owner[]) => {
            this.owners = data;
            this.loading = false;
        });
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            owner: idSelected
        });
        this.router.navigate(['/dashboard/imoveis/criar/confirmacao']);
    }
}