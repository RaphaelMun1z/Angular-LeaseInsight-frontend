import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-section-faq',
  imports: [CommonModule, AccordionModule],
  templateUrl: './section-faq.component.html',
  styleUrl: './section-faq.component.scss'
})

export class SectionFaqComponent {

}
