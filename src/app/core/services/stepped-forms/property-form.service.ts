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
            'selecionar-endereco': (this.form.get('step1')?.valid && this.areImagesValid()) ?? false,
            'selecionar-proprietario': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.areImagesValid()) ?? false,
            'confirmacao': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.form.get('step3')?.valid && this.areImagesValid()) ?? false,
        };
        
        this.stepValidations.next(newValidationState);
    }
    
    isStepAllowed(step: string): boolean {
        return this.stepValidations.getValue()[step];
    }

    areImagesValid(): boolean {
        const files = this.form.get('step1.images')?.value
        if (!files || files.length < 5) {
            this.getFormHandler().addError({
                field: "Arquivos",
                message: "São necessários ao menos 5 fotos da propriedade!"
            });
            return false;
        }
        return true;
    }
}
