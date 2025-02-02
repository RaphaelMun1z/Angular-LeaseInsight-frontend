import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Message } from 'primeng/message';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFileComponent),
    multi: true
}

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-input-file',
    standalone: true,
    imports: [FileUpload, ToastModule, CommonModule, Message, FormsModule],
    providers: [INPUT_FIELD_VALUE_ACCESSOR, MessageService],
    templateUrl: './input-file.component.html',
    styleUrl: './input-file.component.scss'
})

export class InputFileComponent implements ControlValueAccessor, OnInit {
    @Input() label!: string;
    @Input() invalid!: boolean;
    @Input() isReadOnly = false;
    uploadedFiles: File[] = [];
    
    constructor(private messageService: MessageService) {}
    
    ngOnInit() {
        this.onChangeCb(["testando"]);
    }
    
    onFileSelect(event:UploadEvent) {
        this.uploadedFiles.push(...event.files);
        this.onChangeCb(this.uploadedFiles);
    }
    
    onClearFiles() {
        this.uploadedFiles = [];
        this.onChangeCb(this.uploadedFiles);
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
