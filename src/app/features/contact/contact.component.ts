import { Component } from '@angular/core';

import { SupportSectionComponent } from "./components/support-section/support-section.component";
import { SectionFaqComponent } from "../home/components/section-faq/section-faq.component";


@Component({
    selector: 'app-contact',
    imports: [SupportSectionComponent, SectionFaqComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})

export class ContactComponent {
  
}
