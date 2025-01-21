import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Property } from '../../../../shared/interfaces/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-section-properties',
    imports: [CommonModule, RouterModule, PaginatorModule, ButtonModule, TagModule, DividerModule, SplitButtonModule, SplitButton],
    templateUrl: './section-properties.component.html',
    styleUrl: './section-properties.component.scss',
    providers: [PropertyService]
})

export class SectionPropertiesComponent  implements OnInit {
    first: number = 0;
    rows: number = 10;

    items!: MenuItem[];
    properties!: Property[];

    constructor(private service: PropertyService) {}

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    
    ngOnInit() {
        this.service.getAll().subscribe((response) => {
            if (response) {
                this.properties = response;
            }
        });
        
        this.items = [
            {
                label: 'Update',
                command: () => {
                    console.log("A")
                }
            },
            {
                label: 'Delete',
                command: () => {
                    console.log("B")
                }
            },
            { 
                label: 'Angular Website', 
                url: 'http://angular.io' 
            },
            { 
                separator: true 
            },
            { 
                label: 'Upload', 
                routerLink: ['/fileupload'] 
            }
        ];
    }
}
