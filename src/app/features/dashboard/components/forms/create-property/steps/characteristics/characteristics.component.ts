import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePropertyComponent } from '../../create-property.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InputNumberComponent } from '../../../../../../../shared/components/input/input-number/input-number.component';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputFileComponent } from '../../../../../../../shared/components/input/input-file/input-file.component';
import { InputTextareaComponent } from "../../../../../../../shared/components/input/input-textarea/input-textarea.component";

@Component({
    selector: 'app-characteristics',
    imports: [CommonModule, FormsModule, SelectModule, InputTextModule, InputGroupModule, InputFileComponent, InputGroupAddonModule, FloatLabelModule, ButtonModule, PasswordModule, ReactiveFormsModule, InputNumberComponent, InputGroup, InputGroupAddon, FloatLabel, Select, Message, InputTextareaComponent],
    templateUrl: './characteristics.component.html',
    styleUrl: './characteristics.component.scss'
})

export class CharacteristicsComponent implements OnInit {
    form!: FormGroup;
    
    propertyTypeOptions: {name: string, code: string}[] = [];
    occupancyStatusOptions: {name: string, code: string}[] = [];
    residenceAddressOptions: any[]|undefined;
    ownerOptions: any[]|undefined;
    
    router = inject(Router);
    private formContainer = inject(CreatePropertyComponent);
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep1Form();
        
        this.propertyTypeOptions = [
            { name: "CASA", code: "HOUSE"},
            { name: "APARTAMENTO", code: "CONDO"},
            { name: "FAZENDA", code: "FARM"},
            { name: "ARMAZÉM", code: "WAREHOUSE"},
            { name: "APARTAMENTO_COMERCIAL", code: "COMMERCIAL_APARTMENT"},
            { name: "LOJA_VAREJO", code: "RETAIL_STORE"},
            { name: "APARTAMENTO", code: "APARTMENT"},
            { name: "TERRENO", code: "LAND_PLOT"}
        ]
        
        this.occupancyStatusOptions = [
            { name: "OCUPADO", code: "OCCUPIED" },
            { name: "VAGO", code: "VACANT" },
            { name: "PENDENTE_ENTRADA", code: "PENDING_MOVE_IN" },
            { name: "PENDENTE_SAÍDA", code: "PENDING_MOVE_OUT" },
            { name: "EM_MANUTENÇÃO", code: "UNDER_MAINTENANCE" },
            { name: "ALUGADO", code: "LEASED" },
            { name: "DISPONÍVEL", code: "AVAILABLE" },
            { name: "RESERVADO", code: "RESERVED" }
        ]
    }
}