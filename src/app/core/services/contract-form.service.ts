import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ContractFormService {
    private form!: FormGroup;
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
