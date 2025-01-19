import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { SectionHeroComponent } from "./components/section-hero/section-hero.component";
import { SectionIntroductionComponent } from "./components/section-introduction/section-introduction.component";
import { SectionEmphasisComponent } from "./components/section-emphasis/section-emphasis.component";
import { SectionSchedulingComponent } from "./components/section-scheduling/section-scheduling.component";
import { SectionPopularChoicesNearbyComponent } from "./components/section-popular-choices-nearby/section-popular-choices-nearby.component";

@Component({
  selector: 'app-home',
  imports: [ButtonModule, StepperModule, SectionHeroComponent, SectionIntroductionComponent, SectionEmphasisComponent, SectionSchedulingComponent, SectionPopularChoicesNearbyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

}
