import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-input-text',
  imports: [CommonModule, ReactiveFormsModule, InputGroupModule, InputTextModule, InputGroupAddonModule, FloatLabelModule, Message],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})

export class InputTextComponent{
    @Input() invalid!: boolean;
    @Input() formField!: string;
    @Input() label!: string;
    @Input() icon!: string;
}
