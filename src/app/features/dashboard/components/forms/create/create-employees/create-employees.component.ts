import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';
import { EmployeeCreate } from '../../../../../../shared/interfaces/employee';
import { EmployeeService } from '../../../../../../core/services/employee.service';

import { DashboardBaseComponent } from '../../../dashboard-base/dashboard-base.component';
import { ContentBlockComponent } from '../../../content-block/content-block.component';
import { InputTextComponent } from '../../../../../../shared/components/input/input-text/input-text.component';
import { InputMaskComponent } from '../../../../../../shared/components/input/input-mask/input-mask.component';
import { BreadcrumbComponent } from '../../../../../../shared/components/breadcrumb/breadcrumb.component';
import { FormErrorsComponent } from '../../../../../../shared/components/form-errors/form-errors.component';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-create-employees',
    imports: [FormStorageDirective, FormErrorsComponent, InputTextComponent, InputMaskComponent, BreadcrumbComponent, DashboardBaseComponent, ContentBlockComponent, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './create-employees.component.html',
    styleUrl: './create-employees.component.scss'
})

export class CreateEmployeesComponent implements OnInit {    
    employeeCreateForm = new FormHandler("employee-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Funcionários', route: '/dashboard/funcionarios' }, { label: 'Cadastrar', route: '/dashboard/funcionarios/criar' }];
    protected form!: UntypedFormGroup;
    
    private formBuilderService = inject(UntypedFormBuilder);
    private employeeService = inject(EmployeeService);
    
    ngOnInit() {
        this.form = this.formBuilderService.group({
            name: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        })
        
        this.employeeCreateForm.setForm(this.form);      
    }
    
    postForm(){
        this.employeeCreateForm.validForm();
        const data: EmployeeCreate = this.form.value;

        this.employeeService.saveEmployee(data).subscribe({
            next: (res: any) => {    
                this.employeeCreateForm.successCaseState();
            },
            error: (errors: { [key: string]: string }) => { 
                this.employeeCreateForm.failCaseState(errors);
            }
        });
    }
}