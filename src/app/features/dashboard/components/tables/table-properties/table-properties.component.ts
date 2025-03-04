import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Property } from '../../../../../shared/interfaces/property';

import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { PropertyService } from '../../../../../core/services/property.service';

@Component({
    selector: 'app-table-properties',
    imports: [RouterModule, ConfirmPopupModule, ToastModule, ButtonModule, AvatarGroupModule, AvatarModule, TagModule, BadgeModule, CommonModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './table-properties.component.html',
    styleUrl: './table-properties.component.scss'
})

export class TablePropertiesComponent {
    @Input() properties: Property[] = [];
    selectedId!: string;
    
    constructor(private propertyService: PropertyService, private confirmationService: ConfirmationService, private messageService: MessageService) {}
    
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
    
    getStatus(status: number) {
        switch (status) {
            case 1:
            return 'Ocupado';
            case 2:
            return 'Livre';
            case 3:
            return 'Pendente para entrada';
            case 4:
            return 'Pendente para saída';
            case 5:
            return 'Em manutenção';
            case 6:
            return 'Alugado';
            case 7:
            return 'Disponível';
            case 8:
            return 'Reservado';
            default:
            return 'Outros';
        }
    }
}