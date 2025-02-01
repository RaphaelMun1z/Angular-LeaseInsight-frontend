import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../../../../shared/components/input/input-text/input-text.component';
import { CreatePropertyComponent } from '../../create-property.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InputNumberComponent } from '../../../../../../../shared/components/input/input-number/input-number.component';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-characteristics',
    imports: [CommonModule, FormsModule, SelectModule, InputTextModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, InputMask, ButtonModule, PasswordModule, DatePicker, ReactiveFormsModule, InputTextComponent, InputNumberComponent, InputGroup, InputGroupAddon, FloatLabel, Select, Message, Button],
    templateUrl: './characteristics.component.html',
    styleUrl: './characteristics.component.scss'
})

export class CharacteristicsComponent implements OnInit {
    form!: FormGroup;

    propertyTypeOptions: any[]|undefined;
    occupancyStatusOptions: any[]|undefined;
    residenceAddressOptions: any[]|undefined;
    ownerOptions: any[]|undefined;
    
    router = inject(Router);
    private formContainer = inject(CreatePropertyComponent);
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep1Form();
    }
}