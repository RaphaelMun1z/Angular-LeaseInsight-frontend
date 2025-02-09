import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectModule } from 'primeng/select';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
}

@Component({
    selector: 'app-input-select',
    imports: [CommonModule, ReactiveFormsModule, SelectModule, FormsModule, InputGroupModule, InputTextModule, InputGroupAddonModule, FloatLabelModule, Message],
    templateUrl: './input-select.component.html',
    styleUrl: './input-select.component.scss',
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputSelectComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() icon!: string;
    @Input() invalid!: boolean;
    @Input() control!: FormControl | null;
    @Input() isReadOnly = false;
    @Input() items: {name: string, code: string | number }[] | undefined;
    selectedItem!: {name: string, code: string | number };

    onSelectChange(value: any): void {
        this.value = value;
    }

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