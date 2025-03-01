import { BehaviorSubject } from "rxjs";
import { FormCreate } from "./FormCreate";

export class SteppedForm extends FormCreate{
    private steps = new BehaviorSubject<{ [key: string]: boolean }>({
        'caracteristicas': true,
        'selecionar-endereco': false,
        'selecionar-proprietario': false,
        'confirmacao': false,
    });
    public stepValidations$ = this.steps.asObservable();

    constructor(formStorageName: string) {
        super(formStorageName);
    }

    public updateStepValidation() {
        const newValidationState = {
            'caracteristicas': true,
            'selecionar-endereco': this.form.get('step1')?.valid ?? false,
            'selecionar-proprietario': (this.form.get('step1')?.valid && this.form.get('step2')?.valid) ?? false,
            'confirmacao': (this.form.get('step1')?.valid && this.form.get('step2')?.valid && this.form.get('step3')?.valid) ?? false,
        };
        
        this.steps.next(newValidationState);
    }
    
    public isStepAllowed(step: string): boolean {
        return this.steps.getValue()[step];
    }
}