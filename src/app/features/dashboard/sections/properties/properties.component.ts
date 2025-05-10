import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { PagedResidenceResponse, Property } from '../../../../shared/interfaces/property';

import { DashboardBaseComponent } from "../../components/dashboard-base/dashboard-base.component";
import { ContentBlockComponent } from "../../components/content-block/content-block.component";
import { TablePropertiesComponent } from "../../components/tables/table-properties/table-properties.component";
import { PropertyService } from '../../../../core/services/property.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-properties',
    imports: [CommonModule, ContentBlockComponent, DashboardBaseComponent, TablePropertiesComponent, PaginatorModule, RouterModule, SkeletonModule],
    templateUrl: './properties.component.html',
    styleUrl: './properties.component.scss'
})

export class PropertiesComponent implements OnInit {  
    properties : Property[] = [];
    page: number = 0;
    size: number = 9;
    totalRecords!: number;
    
    loading: boolean = true;
    systemDown: boolean = false;
    
    sortRentalValue: { name: string; code: string } | null = null; 
    propertyTypeSelected!: { name: string; code: number } | null;
    citySelected!: { name: string; code: string } | null;
    maxRentalValue!: number | null;
    
    cityItems = [
        {
            name: 'Monte Carmelo',
            code: 'monte-carmelo'
        },
        {
            name: 'Santos',
            code: 'santos'
        },
        {
            name: 'São Paulo',
            code: 'sao-paulo'
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
    
    constructor(private route: ActivatedRoute, private propertyService: PropertyService){
        this.getData();
    }
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const cityParam = this.cityItems.find(c => {
                return c.code.toLowerCase() === params['city'].toLowerCase();
            })
            
            if(cityParam != null && cityParam != undefined){
                this.citySelected = cityParam;
            }
            
            const typeParam = this.propertyTypeItems.find(t => {
                return t.code === parseInt(params['type']);
            })
            
            if(typeParam != null && typeParam != undefined){
                this.propertyTypeSelected = typeParam;
            }
            
            const orderParam = this.orderItems.find(o => {
                return o.code.toLowerCase() === params['order'].toLowerCase();
            })
            
            if(orderParam != null && orderParam != undefined){
                this.sortRentalValue = orderParam;
            }
            
            this.getData();
        });
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
        
        this.systemDown = false;
        this.loading = true;
        
        const sortValue = this.sortRentalValue?.code ?? null;
        const city = this.citySelected?.name ?? null;
        const propertyType = this.propertyTypeSelected?.code.toString() ?? null;
        const maxValue = this.maxRentalValue ?? null;
        
        this.propertyService
        .getPropertiesPaginated(this.page, this.size, sortValue, city, maxValue, propertyType)
        .pipe(take(1))
        .subscribe({
            next: (data: PagedResidenceResponse) => {
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
                
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            },
            error: (err) => {
                this.properties = [];
                this.loading = false;
                this.systemDown = true;
            },
            complete: () => {
                this.loading = false;
            }
        });
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