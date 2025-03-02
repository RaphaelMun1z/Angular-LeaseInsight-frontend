import { UntypedFormGroup } from "@angular/forms";

export class FormHandler {
    protected errors: { [key: string]: string } = {};
    protected errorList: { field: string; message: string }[] = [];
    protected sendSuccess: boolean = false;
    protected loading: boolean = false;
    protected status!: string[];
    protected formStorageName!: string;
    protected form! : UntypedFormGroup;
    
    constructor(formStorageName: string) {
        this.formStorageName = formStorageName;
    }
    
    public getForm(): UntypedFormGroup {
        return this.form;
    }
    
    public setForm(form: UntypedFormGroup): void {
        this.form = form;
    }
    
    public getErrors(): { [key: string]: string } {
        return this.errors;
    }
    
    public setErrors(errors: { [key: string]: string }): void {
        this.errors = errors;
    }
    
    public getErrorList(): { field: string; message: string }[] {
        return this.errorList;
    }
    
    public setErrorList(errorList: { field: string; message: string }[]): void {
        this.errorList = errorList;
    }

    public addError(error: { field: string; message: string }){
        this.errorList.push(error);
    }
    
    public getSendSuccess(): boolean {
        return this.sendSuccess;
    }
    
    public setSendSuccess(sendSuccess: boolean): void {
        this.sendSuccess = sendSuccess;
    }
    
    public getLoading(): boolean {
        return this.loading;
    }
    
    public setLoading(loading: boolean): void {
        this.loading = loading;
    }
    
    public getStatus(): string[] {
        return this.status;
    }
    
    public setStatus(status: string[]): void {
        this.status = status;
    }
    
    public clearErrors(){
        this.setErrorList([]);
        this.setErrors({});
    }

    public clearForm(){
        this.form.reset();
        this.clearErrors();
    }
    
    public updateErrorList() {
        this.setErrorList(
            Object.entries(this.getErrors())
            .map(([field, message]) => ({
                field,
                message
            }))
        );
    }
    
    public validForm() {
        if(!this.form) return;
        this.clearErrors();
        if(this.form.invalid) return;
        this.setLoading(true);
    }
    
    public successCaseState(){
        this.setLoading(false);
        this.setSendSuccess(true);
        this.clearForm();

        setTimeout(() => {
            this.removeCurrentStorage();
        }, 500)

        setTimeout(() => {
            this.setSendSuccess(false);
        }, 5000)
    }

    public failCaseState(errors: { [key: string]: string }) {
        this.setLoading(false);

        try {
            if(errors['status'] == '422'){
                this.setErrors({"erros": errors['message']});
            }else{
                this.setErrors(errors);
            }
        } catch (err) {
            this.setErrors({ "Erro": "Ocorreu um erro inesperado! Tente novamente mais tarde." });
        }
        
        this.updateErrorList();
    }

    public removeCurrentStorage(){
        localStorage.removeItem(this.formStorageName);
    }
}
