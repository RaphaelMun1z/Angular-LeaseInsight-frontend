import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportSectionComponent } from './support-section.component';

describe('SupportSectionComponent', () => {
  let component: SupportSectionComponent;
  let fixture: ComponentFixture<SupportSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
