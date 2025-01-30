import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { Property } from '../../../../shared/interfaces/property';

@Component({
    selector: 'app-table-properties',
    imports: [TagModule, BadgeModule, CommonModule],
    templateUrl: './table-properties.component.html',
    styleUrl: './table-properties.component.scss'
})

export class TablePropertiesComponent {
    @Input() properties: Property[] = [];
    selectedId!: string;
    
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
    
    getStatus(status: string) {
        switch (status) {
            case "VACANT":
            return 'Livre';
            case "OCCUPIED":
            return 'Ocupado';
            case "UNDER_RENOVATION":
            return 'Reservado';
            default:
            return 'Outros';
        }
    }
}