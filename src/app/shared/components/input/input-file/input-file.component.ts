import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FileRemoveEvent, FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
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

export class InputFileComponent implements ControlValueAccessor, AfterViewInit {
    @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload;
    @Input() label!: string;
    @Input() invalid!: boolean;
    @Input() isReadOnly = false;
    uploadedFiles: File[] = [];
    
    ngAfterViewInit(): void {
        this.clearFiles();
    }
    
    clearFiles() {
        this.uploadedFiles = [];
        
        if (this.fileUpload) {
            this.fileUpload.files = [];
            this.fileUpload.clear();
        }
        
        this.onChangeCb(this.uploadedFiles);
    }
    
    onFileSelect(event:UploadEvent) {
        this.uploadedFiles = [...this.uploadedFiles, ...event.files];
        this.onChangeCb(this.uploadedFiles);
    }
    
    onClearFiles() {
        this.uploadedFiles = [];
        this.onChangeCb(this.uploadedFiles);
    }
    
    onRemove(event: FileRemoveEvent) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file !== event.file);
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
