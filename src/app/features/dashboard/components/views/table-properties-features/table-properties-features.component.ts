import { Component, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { AdditionalFeature } from '../../../../../shared/interfaces/additionalFeature';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-properties-features',
    imports: [TableComponent],
    templateUrl: './table-properties-features.component.html',
    styleUrl: './table-properties-features.component.scss'
})

export class TablePropertiesFeaturesComponent {
    @Input() additionalFeatures: AdditionalFeature[] = [];
    globalFilterFields = ['id', 'feature'];
    exportCols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Owner Code' },
        { field: 'feature', header: 'Feature' },
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Recurso", code: "feature", type: "normal" }
    ]
}