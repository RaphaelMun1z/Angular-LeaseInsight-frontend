import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardBaseComponent } from '../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../content-block/content-block.component';

import { Employee, EmployeeCreate } from '../../../../../shared/interfaces/employee';
import { EmployeeService } from '../../../../../core/services/employee.service';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Breadcrumb } from 'primeng/breadcrumb';
import { InputMask } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { Dialog } from 'primeng/dialog';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-employees',
    imports: [RouterModule, Dialog, Breadcrumb, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, Message, ButtonModule, CommonModule, InputMask, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-employees.component.html',
    styleUrl: './create-employees.component.scss'
})

export class CreateEmployeesComponent implements OnInit {    
    errors: { [key: string]: string } = {};
    errorList: { field: string; message: string }[] = [];
    sendSuccess: boolean = false;
    loading: boolean = false;
    status!: string[];
    responseVisible: boolean = false;
    responseItem!: Employee;
    
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private employeeService = inject(EmployeeService);
    
    ngOnInit() {
        this.sendSuccess = false;
        this.loading = false;
        
        this.items = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Funcionários', route: '/dashboard/funcionarios' }, { label: 'Cadastrar', route: '/dashboard/funcionarios/criar' }, { label: 'Formulário' }];
    }
    
    protected form = this.formBuilderService.group({
        id: null,
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        password: ['']
    })
    
    protected submit(){
        this.errorList = []
        this.errors = {}
        
        if(this.form.invalid){
            return;
        }
        
        this.loading = true;
        
        const formValue = this.form.value;
        this.postEmployee(formValue);
    }
    
    postEmployee(employee: EmployeeCreate){
        this.employeeService.saveEmployee(employee).subscribe({
            next: (res: any) => {  
                console.log(res);
                this.responseItem = res; 
                this.showResponseDialog()
                this.loading = false;
                this.sendSuccess = true;
                setTimeout(() => {
                    this.sendSuccess = false;
                }, 5000)
            },
            error: (err: { [key: string]: string }) => { 
                this.loading = false;
                if((err['status'] == '422')){
                    this.errors = {"erros": err['message']};
                }else{
                    this.errors = err;
                }
                this.updateErrorList(); 
            }
        });
    }
    
    updateErrorList() {
        this.errorList = Object.entries(this.errors).map(([field, message]) => ({
            field,
            message
        }));
    }

    showResponseDialog() {
        this.responseVisible = true;
    }
    
    cleanForm(){
        this.form.reset();
    }
}