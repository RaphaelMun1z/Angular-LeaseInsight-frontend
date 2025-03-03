import { Component, Input } from '@angular/core';

import { TableComponent } from '../../../../../shared/components/table/table.component';
import { PropertyAddress } from '../../../../../shared/interfaces/propertyAddress';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

@Component({
    selector: 'app-table-properties-addresses',
    imports: [TableComponent],
    templateUrl: './table-properties-addresses.component.html',
    styleUrl: './table-properties-addresses.component.scss'
})

export class TablePropertiesAddressesComponent {
    @Input() propertiesAddresses: PropertyAddress[] = [];
    globalFilterFields = ['id', 'street', 'district', 'city', 'state', 'country', 'cep', 'complement'];
    exportCols: Column[] = [
        { field: 'id', header: 'Code', customExportHeader: 'Owner Code' },
        { field: 'street', header: 'Street' },
        { field: 'district', header: 'District' },
        { field: 'city', header: 'City' },
        { field: 'state', header: 'State' },
        { field: 'country', header: 'Country' },
        { field: 'cep', header: 'Cep' },
        { field: 'complement', header: 'Complement' },
    ];
    fields = [
        { name: "Código", code: "id", type: "normal" },
        { name: "Logradouro", code: "street", type: "normal" },
        { name: "Bairro", code: "district", type: "normal" },
        { name: "Cidade", code: "city", type: "normal" },
        { name: "Estado", code: "state", type: "normal" },
        { name: "País", code: "country", type: "normal" },
        { name: "Cep", code: "cep", type: "normal" },
        { name: "Complemento", code: "complement", type: "normal" },
    ]
}