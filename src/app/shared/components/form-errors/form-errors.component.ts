import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface AppError {
    type?: string;
    title?: string;
    message: string;
    details?: string;
    field?: string;
    code?: string;
    timestamp?: Date;
}

@Component({
    selector: 'app-form-errors',
    imports: [CommonModule],
    templateUrl: './form-errors.component.html',
    styleUrl: './form-errors.component.scss',
    animations: [
        trigger('fadeInOut', [ transition(':enter', [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            animate('200ms ease-out', 
                style({ opacity: 1, transform: 'translateY(0)' }))
            ]), 
            transition(':leave', [ animate('200ms ease-in', 
                style({ opacity: 0, transform: 'translateY(-10px)' }))
            ])
        ])
    ]
})

export class FormErrorsComponent implements OnInit{
    @Input() item!: string;
    @Input() loading = false;
    @Input() loadingMessage?: string;
    @Input() success = false;
    @Input() successMessage?: string;
    @Input() errors: AppError[] = [];
    @Input() autoDismiss: number = 0;
    
    @Output() dismissed = new EventEmitter<void>();
    
    ngOnInit() {
        if (this.autoDismiss > 0 && this.success) {
            setTimeout(() => this.dismissSuccess(), this.autoDismiss);
        }
    }
    
    getErrorIcon(errorType?: string): string {
        const icons: Record<string, string> = {
            'validation': 'pi-exclamation-circle',
            'auth': 'pi-lock',
            'server': 'pi-server',
            'network': 'pi-cloud-off',
            'database': 'pi-database',
            'timeout': 'pi-clock',
            'permission': 'pi-ban',
            'payment': 'pi-credit-card',
            'default': 'pi-exclamation-triangle'
        };
        return `pi ${icons[errorType || 'default']}`;
    }
    
    removeError(errorToRemove: AppError): void {
        this.errors = this.errors.filter(err => err !== errorToRemove);
        if (this.errors.length === 0) {
            this.dismissed.emit();
        }
    }
    
    dismissSuccess(): void {
        this.success = false;
        this.dismissed.emit();
    }
}
