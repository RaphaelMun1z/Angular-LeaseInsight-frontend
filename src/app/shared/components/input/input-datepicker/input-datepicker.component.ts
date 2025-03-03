import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DatePicker } from 'primeng/datepicker';
import { Message } from 'primeng/message';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDatepickerComponent),
    multi: true
}

@Component({
    selector: 'app-input-datepicker',
    imports: [FormsModule, DatePicker, Message, CommonModule],
    templateUrl: './input-datepicker.component.html',
    styleUrl: './input-datepicker.component.scss',
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputDatepickerComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() invalid!: boolean;
    @Input() control!: FormControl | null;
    @Input() col!: any | null;
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
        if (v !== undefined && v !== null) {
            this.innerValue = v;
        }
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
