import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-number',
  imports: [CommonModule, ReactiveFormsModule, InputNumber, InputGroupModule, InputTextModule, InputGroupAddonModule, FloatLabelModule, Message],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss'
})

export class InputNumberComponent {
    @Input() invalid!: boolean;
    @Input() formField!: string;
    @Input() label!: string;
    @Input() icon!: string;
}
