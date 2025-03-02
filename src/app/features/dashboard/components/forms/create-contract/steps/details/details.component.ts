import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateContractComponent } from '../../create-contract.component';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { Router } from '@angular/router';
import { FormHandler } from '../../../../../../../shared/utils/FormHandler';
import { ContractFormService } from '../../../../../../../core/services/stepped-forms/contract-form.service';
import { invoiceDueDates, contractStatus } from '../../../../../../../shared/utils/ConstLists';

@Component({
    selector: 'app-details',
    imports: [FormsModule, ReactiveFormsModule, DatePicker, CommonModule, Message, Select, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ButtonModule],
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
        this.form = this.contractFormService.getStep1Form();
    }
}
