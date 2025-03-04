import { Component } from '@angular/core';
import { TeamSectionComponent } from "./components/team-section/team-section.component";
import { SectionTestimonialsComponent } from "../home/components/section-testimonials/section-testimonials.component";
import { SectionEmphasisComponent } from "../../shared/components/section-emphasis/section-emphasis.component";

@Component({
  selector: 'app-about-us',
  imports: [TeamSectionComponent, SectionTestimonialsComponent, SectionEmphasisComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
