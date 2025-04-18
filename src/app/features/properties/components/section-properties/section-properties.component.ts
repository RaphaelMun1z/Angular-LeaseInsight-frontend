import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';

import { PropertyStateService } from '../../../../core/states/property-state.service';
import { PagedResidenceResponse, Property } from '../../../../shared/interfaces/property';

import { SplitButtonModule } from 'primeng/splitbutton';
import { PaginatorModule } from 'primeng/paginator';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PropertyMinimalComponent } from "../../../../shared/components/cards/property-minimal/property-minimal.component";
import { PropertyService } from '../../../../core/services/property.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-section-properties',
    imports: [CommonModule, RouterModule, FormsModule, SkeletonModule, PaginatorModule, SelectModule, ButtonModule, TagModule, DividerModule, SplitButtonModule, PropertyMinimalComponent],
    templateUrl: './section-properties.component.html',
    styleUrl: './section-properties.component.scss'
})

export class SectionPropertiesComponent implements OnInit{
    properties! : Property[];
    page: number = 0;
    size: number = 9;
    totalRecords!: number;
    
    loading: boolean = true;
    
    sortRentalValue: { name: string; code: string } | null = null; 
    propertyTypeSelected!: { name: string; code: string } | null;
    citySelected!: { name: string; code: string } | null;
    maxRentalValue!: number | null;
    
    isSticky = false;
    private stickyOffset = 0;
    
    cityItems = [
        {
            name: 'Monte Carmelo',
            code: 'Monte Carmelo'
        },
        {
            name: 'Santos',
            code: 'Santos'
        },
        {
            name: 'São Paulo',
            code: 'São Paulo'
        },
    ]
    
    propertyTypeItems = [
        { name: 'Casa', code: 1 },
        { name: 'Condomínio', code: 2 },
        { name: 'Fazenda/Sítio', code: 3 },
        { name: 'Galpão/Armazém', code: 4 },
        { name: 'Apartamento Comercial', code: 5 },
        { name: 'Loja Comercial', code: 6 },
        { name: 'Apartamento', code: 7 },
        { name: 'Terreno', code: 8 } 
    ];
    
    orderItems = [
        {
            name: 'Do menor valor para o maior',
            code: 'asc'
        },
        {
            name: 'Do maior valor para o menor',
            code: 'desc'
        },
    ];
    
    constructor(private propertyService: PropertyService, private propertyStateService: PropertyStateService){
        this.getData();
    }
    
    ngOnInit(): void {
        this.calculateStickyOffset();
    }
    
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isSticky = scrollPosition >= this.stickyOffset;
    }
    
    @HostListener('window:resize')
    onResize() {
        this.calculateStickyOffset();
    }
    
    private calculateStickyOffset() {
        const element = document.querySelector('.places-container');
        if (element) {
            this.stickyOffset = element.getBoundingClientRect().top + window.scrollY;
        }
    }
    
    onPageChange(event: any) {
        this.page = event.first / event.rows;
        this.size = event.rows;
        this.getData();
    }
    
    getData() {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        this.loading = true;
        
        const sortValue = this.sortRentalValue?.code ?? null;
        const city = this.citySelected?.code ?? null;
        const propertyType = this.propertyTypeSelected?.code ?? null;
        const maxValue = this.maxRentalValue ?? null;
        
        this.propertyService
        .getPropertiesPaginated(this.page, this.size, sortValue, city, maxValue, propertyType)
        .pipe(take(1))
        .subscribe((data: PagedResidenceResponse) => {
            this.page = data.page.number;
            this.size = data.page.size;
            this.totalRecords = data.page.totalElements;
            
            if(!data._embedded){
                this.properties = [];
                return;
            }
            
            data._embedded.residenceResponseDTOList.forEach(item => {
                item.fullAddress = `${item.residenceAddress.district}, ${item.residenceAddress.city} - ${item.residenceAddress.state}`;
            });
            
            this.properties = data._embedded.residenceResponseDTOList;
        });
        
        setTimeout(() => {
            this.loading = false;
        }, 1000)
    }
    
    resetFilters() {
        this.sortRentalValue = null;
        this.propertyTypeSelected = null;
        this.citySelected = null;
        this.maxRentalValue = null;
        this.getData();
    }
    
    refresh() {
        this.getData();
    }
}