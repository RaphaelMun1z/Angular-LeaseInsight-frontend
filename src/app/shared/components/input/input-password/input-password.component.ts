import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true
}

@Component({
    selector: 'app-input-password',
    imports: [CommonModule, ReactiveFormsModule, PasswordModule, FormsModule, InputGroupModule, InputTextModule, InputGroupAddonModule, FloatLabelModule, Message],
    templateUrl: './input-password.component.html',
    styleUrl: './input-password.component.scss',
    providers: [INPUT_FIELD_VALUE_ACCESSOR]

})

export class InputPasswordComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() invalid!: boolean;
    @Input() control!: FormControl | null;
    @Input() isReadOnly = false;
    
    private innerValue: any;
    get value(){
        return this.innerValue;
    }
    
    set value(v: any){
        if(v !== this.innerValue){
            this.innerValue = v;
            this.onChangeCb(v);
        }
    }
    
    onChangeCb: (_: any) => void = () => {};
    onTouchedCb: (_: any) => void = () => {};
    
    writeValue(v: any): void {
        this.value = v;
    }
    
    registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
        this.isReadOnly = isDisabled;
    }
}