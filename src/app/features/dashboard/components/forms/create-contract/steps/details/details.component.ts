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

@Component({
    selector: 'app-details',
    imports: [FormsModule, ReactiveFormsModule, DatePicker, CommonModule, Message, Select, FloatLabelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, ButtonModule],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
    form!: FormGroup;
    
    invoiceDueDates: number[] = [];
    contractStatus: {status: string, value: string}[] = [];
    
    private formContainer = inject(CreateContractComponent);
    
    ngOnInit(): void {
        this.form = this.formContainer.getStep3Form();
        
        this.invoiceDueDates = [5, 10, 15, 20];
        this.contractStatus = [
            {status: "ACTIVE", value: "ACTIVE"},
            {status: "EXEMPLO", value: "EXEMPLO"},
            {status: "EXEMPLO", value: "EXEMPLO"},
            {status: "EXEMPLO", value: "EXEMPLO"},
            {status: "EXEMPLO", value: "EXEMPLO"}
        ]
    }
}
