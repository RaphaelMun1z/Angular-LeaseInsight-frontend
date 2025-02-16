import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { OwnerStateService } from '../../../core/states/owner-state.service';
import { Property } from '../../../shared/interfaces/property';

import { DashboardBaseComponent } from '../../dashboard/components/dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../dashboard/components/content-block/content-block.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Table } from 'primeng/table';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-properties',
    imports: [TableModule, FormsModule, DropdownModule, DashboardBaseComponent, ContentBlockComponent, Toolbar, TagModule, IconFieldModule, Button, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule],
    providers: [MessageService, ConfirmationService],
    templateUrl: './properties.component.html',
    styleUrl: './properties.component.scss'
})

export class PropertiesComponent implements OnInit {
    protected properties$ = new Observable<Property[]>();
    properties! : Property[];
    
    value = signal<string | null>(null);
    occupancyStatuses!: any[];
    propertyTypeStatuses!: any[];
    
    @ViewChild('dt') dt!: Table;
    cols!: Column[];
    exportColumns!: ExportColumn[];
    
    constructor(private ownerStateService: OwnerStateService, private cd: ChangeDetectorRef){
        this.ownerStateService.loadCurrentOwnerProperties();
    }
    
    ngOnInit(): void {
        this.loadDemoData();
        
        this.getCurrentClientProperties();
        this.properties$.subscribe((data: Property[]) => {
            data.forEach(item => {
                item.fullAddress = `${item.residenceAddress.street}, ${item.number}, ${item.residenceAddress.district}, ${item.residenceAddress.city} - ${item.residenceAddress.state}, ${item.residenceAddress.country}, ${item.residenceAddress.cep}, ${item.residenceAddress.complement}`;
            });
            this.properties = data;
        });
        
        this.occupancyStatuses = [
            { label: 'OCCUPIED', value: 'OCCUPIED' },
            { label: 'VACANT', value: 'VACANT' },
            { label: 'PENDING_MOVE_IN', value: 'PENDING_MOVE_IN' },
            { label: 'PENDING_MOVE_OUT', value: 'PENDING_MOVE_OUT' },
            { label: 'UNDER_MAINTENANCE', value: 'UNDER_MAINTENANCE' },
            { label: 'LEASED', value: 'LEASED' },
            { label: 'AVAILABLE', value: 'AVAILABLE' },
            { label: 'RESERVED', value: 'RESERVED' }
        ];

        this.propertyTypeStatuses = [
            { label: 'OCCUPIED', value: 'OCCUPIED' },
            { label: 'VACANT', value: 'VACANT' },
            { label: 'PENDING_MOVE_IN', value: 'PENDING_MOVE_IN' },
            { label: 'PENDING_MOVE_OUT', value: 'PENDING_MOVE_OUT' },
            { label: 'UNDER_MAINTENANCE', value: 'UNDER_MAINTENANCE' },
            { label: 'LEASED', value: 'LEASED' },
            { label: 'AVAILABLE', value: 'AVAILABLE' },
            { label: 'RESERVED', value: 'RESERVED' }
        ];
    }
    
    getCurrentClientProperties(){
        this.properties$ = this.ownerStateService.listenToCurrentOwnerProperties();
    }
    
    loadDemoData() {
        this.cd.markForCheck();
        
        this.cols = [
            { field: 'id', header: 'Code', customExportHeader: 'Employee Code' },
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'E-mail' }
        ];
        
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    
    exportCSV() {
        this.dt.exportCSV();
    }
    
    clear(table: Table) {
        table.clear();
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.properties.length; i++) {
            if (this.properties[i].id === id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
    
    getOccupancyStatus(status: string){
        switch (status) {
            case "OCCUPIED":
            return "Ocupado";
            case "VACANT":
            return "Vago";
            case "PENDING_MOVE_IN":
            return "Pendente para Entrada";
            case "PENDING_MOVE_OUT":
            return "Pendente para Saída";
            case "UNDER_MAINTENANCE":
            return "Em Manutenção";
            case "LEASED":
            return "Alugado";
            case "AVAILABLE":
            return "Disponível";
            case "RESERVED":
            return "Reservado";
            default:
            return "Outro";
        }        
    }
    
    getOccupancyStatusSeverity(status: string) {
        switch (status) {
            case "OCCUPIED":
            return "success";
            case "VACANT":
            return "info";
            case "PENDING_MOVE_IN":
            return "warn";
            case "PENDING_MOVE_OUT":
            return "warn";
            case "UNDER_MAINTENANCE":
            return "danger";
            case "LEASED":
            return "success";
            case "AVAILABLE":
            return "info";
            case "RESERVED":
            return "secondary";
            default:
            return "secondary";
        }
    }
    
    getPropertyTypeStatus(status: string){
        switch (status) {
            case "HOUSE":
            return "Casa";
            case "CONDO":
            return "Condomínio";
            case "FARM":
            return "Fazenda";
            case "WAREHOUSE":
            return "Armazém";
            case "COMMERCIAL_APARTMENT":
            return "Apartamento Comercial";
            case "RETAIL_STORE":
            return "Loja de Varejo";
            case "APARTMENT":
            return "Apartamento";
            case "LAND_PLOT":
            return "Terreno";
            default:
            return "Outro";
        }
    }
    
    getPropertyTypeStatusSeverity(status: string) {
        switch (status) {
            case "HOUSE":
            return "success";
            case "CONDO":
            return "info";
            case "FARM":
            return "warn";
            case "WAREHOUSE":
            return "warn";
            case "COMMERCIAL_APARTMENT":
            return "secondary";
            case "RETAIL_STORE":
            return "success";
            case "APARTMENT":
            return "info";
            case "LAND_PLOT":
            return "secondary";
            default:
            return "secondary";
        }
    }
}