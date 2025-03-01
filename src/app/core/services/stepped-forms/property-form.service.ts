import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormHandler } from '../../../shared/utils/FormHandler';

@Injectable({
    providedIn: 'root'
})

export class PropertyFormService {
    private form!: FormGroup;
    private formHandler!: FormHandler;
    private stepValidations = new BehaviorSubject<{ [key: string]: boolean }>({
        'caracteristicas': true,
        'selecionar-endereco': false,
        'selecionar-proprietario': false,
        'confirmacao': false,
    });
    stepValidations$ = this.stepValidations.asObservable();
    
    setForm(form: FormGroup) {
        this.form = form;
        this.updateStepValidation();
    }
    
    public getFormHandler(): FormHandler{
        return this.formHandler;
    }
    
    setFormHandler(form: FormHandler): void{
        this.formHandler = form;
    }
    
    updateStepValidation() {
        const newValidationState = {
            'caracteristicas': true,
            'selecionar-endereco': this.form.get('step1')?.valid ?? false,
            'selecionar-proprietario': (this.form.get('step1')?.valid && this.form.get('step2')?.valid) ?? false,
            'confirmacao': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.form.get('step3')?.valid) ?? false,
        };
        
        this.stepValidations.next(newValidationState);
    }
    
    isStepAllowed(step: string): boolean {
        return this.stepValidations.getValue()[step];
    }
}
