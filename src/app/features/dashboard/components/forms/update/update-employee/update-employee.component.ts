import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EmployeeStateService } from '../../../../../../core/states/employee-state.service';
import { EmployeeService } from '../../../../../../core/services/employee.service';
import { Employee, EmployeeUpdate } from '../../../../../../shared/interfaces/employee';

import { FormHandler } from '../../../../../../shared/utils/FormHandler';
import { FormStorageDirective } from '../../../../../../shared/directives/form-storage.directive';

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
    selector: 'app-update-employee',
    imports: [DashboardBaseComponent, BreadcrumbComponent, InputTextComponent, InputMaskComponent, FormErrorsComponent, FormStorageDirective, ContentBlockComponent, RouterModule, FormsModule, SelectModule, ButtonModule, CommonModule, PasswordModule, InputGroupModule, FloatLabelModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './update-employee.component.html',
    styleUrl: './update-employee.component.scss'
})

export class UpdateEmployeeComponent implements OnInit {
    employeeUpdateForm = new FormHandler("employee-update-form");
    breadCrumbItems: MenuItem[] = [{ icon: 'pi pi-home', route: '/dashboard' }, { label: 'Funcionários', route: '/dashboard/funcionarios' }, { label: 'Atualizar', route: '/dashboard/funcionarios/atualizar' }];
    protected form!: UntypedFormGroup;
    
    currentId!: string;
    employee! : Employee;
    
    private route = inject(ActivatedRoute);
    router = inject(Router);
    private formBuilderService = inject(UntypedFormBuilder);
    private employeeService = inject(EmployeeService);
    private employeeStateService = inject(EmployeeStateService);
    constructor(){}
    
    ngOnInit() {
        this.route.paramMap.subscribe(value => {
            this.currentId = value.get("id") || "";
            
            this.employeeStateService.loadEmployee(this.currentId).subscribe({
                next: (employee: Employee | null) => {
                    if(employee){
                        this.form.patchValue({
                            name: employee.name,
                            phone: employee.phone,
                            email: employee.email
                        })
                    }
                },
                error: () => {
                    this.router.navigate(['/dashboard/funcionarios']);
                }
            });
        });
        
        this.form = this.formBuilderService.group({
            name: [''],
            phone: [''],
            email: ['']
        })
        this.employeeUpdateForm.setForm(this.form);
    }
    
    postForm(){
        this.employeeUpdateForm.validForm();
        const data: EmployeeUpdate = this.form.value;
        this.employeeService.patchEmployee(data, this.currentId).subscribe({
            next: (res: any) => {    
                this.employeeUpdateForm.successCaseState();
                this.router.navigate(['/dashboard/funcionarios']);
            },
            error: (errors: { [key: string]: string }) => { 
                this.employeeUpdateForm.failCaseState(errors);
            }
        });
    }
}