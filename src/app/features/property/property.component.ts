import { Component } from '@angular/core';

/* import { FloatLabelModule } from "primeng/floatlabel"
 */

import { HeroImagesSectionComponent } from "./components/hero-images-section/hero-images-section.component";
import { DetailsSectionComponent } from "./components/details-section/details-section.component";
import { RecommendedComponent } from "./components/recommended/recommended.component";

@Component({
    selector: 'app-property',
    imports: [HeroImagesSectionComponent, DetailsSectionComponent, RecommendedComponent],
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss'
})

export class PropertyComponent {

}
