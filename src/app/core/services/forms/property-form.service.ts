import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PropertyFormService {
    private form!: FormGroup;
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
