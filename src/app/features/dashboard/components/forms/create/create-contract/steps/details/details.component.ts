import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormHandler } from '../../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../../core/services/stepped-forms/contract-form.service';
import { invoiceDueDates, contractStatus } from '../../../../../../../../shared/utils/ConstLists';
import { InputNumberComponent } from '../../../../../../../../shared/components/input/input-number/input-number.component';
import { InputSelectComponent } from '../../../../../../../../shared/components/input/input-select/input-select.component';
import { InputDatepickerComponent } from '../../../../../../../../shared/components/input/input-datepicker/input-datepicker.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-details',
    imports: [FormsModule, ReactiveFormsModule, InputDatepickerComponent, InputNumberComponent, InputSelectComponent, CommonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ButtonModule],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
    form!: FormGroup;
    contractCreateForm!: FormHandler;
    
    invoiceDueDates = invoiceDueDates;
    contractStatus = contractStatus;
    
    router = inject(Router);
    public contractFormService = inject(ContractFormService);
    
    ngOnInit(): void {
        this.contractCreateForm = this.contractFormService.getFormHandler();
        this.form = this.contractFormService.getStep3Form();
    }
}
