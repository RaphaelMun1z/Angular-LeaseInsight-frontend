import { Component, inject, OnInit } from '@angular/core';
import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ClientService } from '../../../../../core/services/client.service';
import { ClientCreate } from '../../../../../shared/interfaces/client';

@Component({
    selector: 'app-create-client',
    imports: [DashboardBaseComponent, ContentBlockComponent, SelectModule, Message, ButtonModule, CommonModule, InputMask, DatePicker, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-client.component.html',
    styleUrl: './create-client.component.scss'
})

export class CreateClientComponent implements OnInit {
    status!: string[];
    addresses: { name: string, code: string }[] = [];
    selectedOption!: { name: string, code: string };
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private clientService = inject(ClientService);
    
    ngOnInit() {
        this.sendSuccess = false;
        this.status = [
            "PENDING",
            "ACTIVE"
        ];
        
        this.addresses = [
            { name: 'Teste', code: 'bc6e2e04-45e5-4ae5-b898-87c2c5331381' }
        ];
        
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        this.form.patchValue({
            registrationDate: formattedDate
        });
    }
    
    protected form = this.formBuilderService.group({
        id: null,
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        password: [''],
        dateOfBirth: ['', Validators.required],
        cpf: ['', Validators.required],
        rg: ['', Validators.required],
        registrationDate: [''],
        tenantStatus: ['', Validators.required],
        tenantBillingAddress: this.formBuilderService.group({
            id: ['', Validators.required],
        })
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        const formValue = this.form.value;
        formValue.dateOfBirth = this.formatDate(formValue.dateOfBirth);
        formValue.tenantBillingAddress = { "id": formValue.tenantBillingAddress.id.code};
        this.postClient(formValue);
    }
    
    postClient(client: ClientCreate){
        console.log(JSON.stringify(client, null, 2));
        this.clientService.saveClient(client).subscribe({
            next: (res: any) => {    
                this.sendSuccess = true;
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: any) => { 
                this.errors = err;
                console.log(this.errors)
                this.updateErrorList(); 
            }
        });
    }
    
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
    }
    
    updateErrorList() {
        this.errorList = Object.entries(this.errors).map(([field, message]) => ({
            field,
            message
        }));
    }
}