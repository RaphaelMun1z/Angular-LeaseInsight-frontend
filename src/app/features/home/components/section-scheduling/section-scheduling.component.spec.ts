import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSchedulingComponent } from './section-scheduling.component';

describe('SectionSchedulingComponent', () => {
  let component: SectionSchedulingComponent;
  let fixture: ComponentFixture<SectionSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionSchedulingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
