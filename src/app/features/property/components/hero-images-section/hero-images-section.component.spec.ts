import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroImagesSectionComponent } from './hero-images-section.component';

describe('HeroImagesSectionComponent', () => {
  let component: HeroImagesSectionComponent;
  let fixture: ComponentFixture<HeroImagesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroImagesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroImagesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
