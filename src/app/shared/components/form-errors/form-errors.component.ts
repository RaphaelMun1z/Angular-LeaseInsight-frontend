import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Message } from 'primeng/message';

@Component({
    selector: 'app-form-errors',
    imports: [CommonModule, Message],
    templateUrl: './form-errors.component.html',
    styleUrl: './form-errors.component.scss'
})

export class FormErrorsComponent {
    @Input() item!: string;
    @Input() loading = false;
    @Input() success = false;
    @Input() errors: { field: string; message: string }[] = [];
}
