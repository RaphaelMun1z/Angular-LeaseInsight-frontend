import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormGroup } from '@angular/forms';
import { FormHandler } from '../../../../../../../shared/utils/FormHandler';
import { PropertyFormService } from '../../../../../../../core/services/stepped-forms/property-form.service';
import { InputNumberComponent } from '../../../../../../../shared/components/input/input-number/input-number.component';
import { InputFileComponent } from '../../../../../../../shared/components/input/input-file/input-file.component';
import { InputTextareaComponent } from "../../../../../../../shared/components/input/input-textarea/input-textarea.component";
import { InputSelectComponent } from '../../../../../../../shared/components/input/input-select/input-select.component';
import { propertyType, occupancyStatus } from '../../../../../../../shared/utils/ConstLists';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-characteristics',
    imports: [CommonModule, FormsModule, SelectModule, InputSelectComponent, InputTextModule, InputGroupModule, InputFileComponent, InputGroupAddonModule, FloatLabelModule, ButtonModule, PasswordModule, ReactiveFormsModule, InputNumberComponent, InputTextareaComponent],
    templateUrl: './characteristics.component.html',
    styleUrl: './characteristics.component.scss'
})

export class CharacteristicsComponent implements OnInit {
    form!: FormGroup;
    propertyCreateForm!: FormHandler;
    
    propertyTypeOptions: {name: string, code: string}[] = [];
    occupancyStatusOptions: {name: string, code: string}[] = [];
    
    public propertyFormService = inject(PropertyFormService);
    
    ngOnInit(): void {
        this.propertyCreateForm = this.propertyFormService.getFormHandler();
        this.form = this.propertyFormService.getStep1Form();
        this.propertyTypeOptions = propertyType;
        this.occupancyStatusOptions = occupancyStatus;
    }
}