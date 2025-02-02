import { Component, forwardRef, Input } from '@angular/core';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextareaComponent),
    multi: true
}

@Component({
    selector: 'app-input-textarea',
    imports: [CommonModule, FormsModule, InputGroupAddonModule, FloatLabelModule, InputGroupModule, InputTextModule, Message],
    templateUrl: './input-textarea.component.html',
    styleUrl: './input-textarea.component.scss',
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputTextareaComponent implements ControlValueAccessor {
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
