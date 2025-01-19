import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPopularChoicesNearbyComponent } from './section-popular-choices-nearby.component';

describe('SectionPopularChoicesNearbyComponent', () => {
  let component: SectionPopularChoicesNearbyComponent;
  let fixture: ComponentFixture<SectionPopularChoicesNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPopularChoicesNearbyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPopularChoicesNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
