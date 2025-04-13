import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
}

@Component({
    selector: 'app-input-text',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, InputGroupModule, InputTextModule, InputGroupAddonModule, FloatLabelModule, Message],
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputTextComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() invalid!: boolean;
    @Input() control!: FormControl | null;
    @Input() isReadOnly: boolean = false;
    @Input() isDisabled: boolean = false;
    
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
}
