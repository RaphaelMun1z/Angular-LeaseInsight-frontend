import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordValue = control.get(password)?.value;
        const confirmPasswordValue = control.get(confirmPassword)?.value;
        
        if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
            return { passwordMismatch: true };
        }
        return null;
    };
}