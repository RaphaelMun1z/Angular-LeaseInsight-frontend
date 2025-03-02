import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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
    private requiredImages: string[] = [];
    
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

    getRequiredImages(): string[] {
        return this.requiredImages;
    }

    setRequiredImages(requiredImages: string[]): void {
        this.requiredImages = requiredImages;
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
            'caracteristicas': true,
            'selecionar-endereco': (this.form.get('step1')?.valid) ?? false,
            'selecionar-proprietario': (this.form.get('step1')?.valid && this.form.get('step2')?.valid) ?? false,
            'confirmacao': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.form.get('step3')?.valid) ?? false,
        };
        
        this.stepValidations.next(newValidationState);
    }
    
    isStepAllowed(step: string): boolean {
        return this.stepValidations.getValue()[step];
    }
    
    lengthArray(min: number, max: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value || !Array.isArray(control.value)) {
                return { invalidType: true };
            }
            
            const length = control.value.length;
            
            if (length < min) {
                return { minLengthArray: { requiredMin: min, actual: length } };
            }
            
            if (length > max) {
                return { maxLengthArray: { requiredMax: max, actual: length } };
            }
            
            return null;
        };
    }
}
