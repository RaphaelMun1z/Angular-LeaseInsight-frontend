import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { OwnerStateService } from '../../../../../../../core/states/owner-state.service';
import { Owner } from '../../../../../../../shared/interfaces/owner';
import { CreatePropertyComponent } from '../../create-property.component';

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
    private formContainer = inject(CreatePropertyComponent);
    constructor(private ownerStateService: OwnerStateService){
        this.ownerStateService.loadOwners();
    }
    
    ngOnInit() {
        this.form = this.formContainer.getStep3Form();
        
        this.getOwneres();
        this.owners$.subscribe((data: Owner[]) => {
            this.owners = data;
            this.loading = false;
        });
    }
    
    getOwneres(){
        this.owners$ = this.ownerStateService.listenToChanges();
    }
    
    clear(table: Table) {
        table.clear();
    }
    
    selected(idSelected: string){
        this.form.patchValue({
            owner: idSelected
        });
        this.router.navigate(['/dashboard/imoveis/criar/confirmacao']);
    }
}