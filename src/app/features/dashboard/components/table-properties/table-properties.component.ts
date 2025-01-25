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

    getSeverity(status: number) {
        switch (status) {
            case 1:
            return 'success';
            case 2:
            return 'warn';
            case 3:
            return 'danger';
            default:
            return 'info';
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
}