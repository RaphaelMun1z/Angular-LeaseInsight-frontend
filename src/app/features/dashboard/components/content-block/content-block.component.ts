import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-content-block',
    imports: [CommonModule],
    templateUrl: './content-block.component.html',
    styleUrl: './content-block.component.scss'
})

export class ContentBlockComponent {
    @Input() title!: string;
    @Input() type!: string;
    @Input() isGrid: boolean = false;
}
