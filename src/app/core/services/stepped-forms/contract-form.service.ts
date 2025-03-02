import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormHandler } from '../../../shared/utils/FormHandler';

@Injectable({
    providedIn: 'root'
})

export class ContractFormService {
    private form!: FormGroup;
    private formHandler!: FormHandler;
    private stepValidations = new BehaviorSubject<{ [key: string]: boolean }>({
        'selecionar-imovel': true,
        'selecionar-cliente': false,
        'detalhes': false,
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

    getStep1Form(): FormGroup {
        return this.form.get('step1') as FormGroup;
    }
    
    getStep2Form(): FormGroup {
        return this.form.get('step2') as FormGroup;
    }
    
    getStep3Form(): FormGroup {
        return this.form.get('step3') as FormGroup;
    }
    
    getAllSteps(): FormGroup {
        return this.form as FormGroup;
    }
    
    updateStepValidation() {
        const newValidationState = {
            'selecionar-imovel': true,
            'selecionar-cliente': this.form.get('step1')?.valid ?? false,
            'detalhes': (this.form.get('step1')?.valid && this.form.get('step2')?.valid) ?? false,
            'confirmacao': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.form.get('step3')?.valid) ?? false,
        };
        
        this.stepValidations.next(newValidationState);
    }
    
    isStepAllowed(step: string): boolean {
        return this.stepValidations.getValue()[step];
    }
}
