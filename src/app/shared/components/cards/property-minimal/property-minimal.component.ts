import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Property, PropertyMinimal } from '../../../interfaces/property';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-property-minimal',
    imports: [CommonModule, RouterModule, CarouselModule, ButtonModule, TagModule, DividerModule],
    templateUrl: './property-minimal.component.html',
    styleUrl: './property-minimal.component.scss'
})
export class PropertyMinimalComponent {
    @Input() propertyMinimal! : Property | PropertyMinimal;
    
    getPropertyType(type: string) {
        switch (type) {
            case 'HOUSE':
            return 'Casa';
            case 'CONDO':
            return 'Condomínio';
            case 'FARM':
            return 'Fazenda';
            case 'WAREHOUSE':
            return 'Galpão';
            case 'COMMERCIAL_APARTMENT':
            return 'Sala Comercial';
            case 'RETAIL_STORE':
            return 'Loja';
            case 'APARTMENT':
            return 'Apartamento';
            case 'LAND_PLOT':
            return 'Terreno';
            default:
            return 'Desconhecido';
        }
    }
}
