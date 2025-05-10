import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Property } from '../../../../../shared/interfaces/property';

import { PropertyMinimalAltComponent } from "../../../../../shared/components/cards/property-minimal-alt/property-minimal-alt.component";
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { PropertyService } from '../../../../../core/services/property.service';
import { PropertyStateService } from '../../../../../core/states/property-state.service';

@Component({
    selector: 'app-table-properties',
    imports: [RouterModule, CommonModule, PropertyMinimalAltComponent],
    templateUrl: './table-properties.component.html',
    styleUrl: './table-properties.component.scss'
})

export class TablePropertiesComponent {
    @Input() properties: Property[] = [];
    
    constructor() {}
    
    private service = inject(PropertyService);
    private stateService = inject(PropertyStateService);
    private messageService = inject(MessageService);
    
    deleteProperty = (propertyId: string) => {
        console.log(propertyId)
        this.service.deleteProperty(propertyId).pipe(take(1))
        .subscribe({
            next: (res: any) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Propriedade excluída com sucesso!'
                });
                this.stateService.removeProperty(propertyId);
                this.properties = this.properties.filter((val) => val.id !== propertyId);
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