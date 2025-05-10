import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Property } from '../../../../../shared/interfaces/property';

import { PropertyMinimalAltComponent } from "../../../../../shared/components/cards/property-minimal-alt/property-minimal-alt.component";

@Component({
    selector: 'app-table-properties',
    imports: [RouterModule, CommonModule, PropertyMinimalAltComponent],
    templateUrl: './table-properties.component.html',
    styleUrl: './table-properties.component.scss'
})

export class TablePropertiesComponent {
    @Input() properties: Property[] = [];
    
    constructor() {}
}