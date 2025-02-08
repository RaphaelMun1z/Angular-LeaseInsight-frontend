import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Directive({
    selector: 'form[formGroup][storage]',
    standalone: true,
})

export class FormStorageDirective implements OnInit, OnDestroy {
    @Input() formGroup!: FormGroup;
    @Input() storage!: string;
    private destroy$ = new Subject<void>();
    
    constructor() {}

    ngOnInit(): void {
        this.updateFormValue();
        this.listenUpdateValue();
    }
    
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    private updateFormValue(): void {
        const storageValue = JSON.parse(localStorage.getItem(this.storage) ?? '{}');
        if (storageValue) {
            this.formGroup.patchValue(storageValue);
        }
    }
    
    private listenUpdateValue(): void {
        this.formGroup.valueChanges
        .pipe(debounceTime(300), takeUntil(this.destroy$))
        .subscribe((value) =>
            localStorage.setItem(this.storage, JSON.stringify(value)));
    }
}