import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTestimonialsComponent } from './section-testimonials.component';

describe('SectionTestimonialsComponent', () => {
  let component: SectionTestimonialsComponent;
  let fixture: ComponentFixture<SectionTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
