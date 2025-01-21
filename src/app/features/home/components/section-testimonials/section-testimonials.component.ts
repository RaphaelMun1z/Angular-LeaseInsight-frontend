import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Testimonial } from '../../../../shared/interfaces/testimonial';
import { TestimonialService } from '../../../../shared/services/testimonial.service';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-section-testimonials',
  imports: [CommonModule, CarouselModule, AvatarModule],
  templateUrl: './section-testimonials.component.html',
  styleUrl: './section-testimonials.component.scss',
      providers: [TestimonialService]
})

export class SectionTestimonialsComponent implements OnInit {
    testimonials!: Testimonial[];
    
    responsiveOptions: any[] | undefined;
    
    constructor(private service: TestimonialService) {}
    
    ngOnInit() {
        this.service.getAll().subscribe((response) => {
            if (response) {
                this.testimonials = response;
            }
        });
        
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 5,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
    }
}