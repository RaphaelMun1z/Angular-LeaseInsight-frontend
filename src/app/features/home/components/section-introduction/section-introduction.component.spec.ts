import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionIntroductionComponent } from './section-introduction.component';

describe('SectionIntroductionComponent', () => {
  let component: SectionIntroductionComponent;
  let fixture: ComponentFixture<SectionIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
