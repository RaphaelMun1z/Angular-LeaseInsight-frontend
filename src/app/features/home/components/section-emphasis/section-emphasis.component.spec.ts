import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEmphasisComponent } from './section-emphasis.component';

describe('SectionEmphasisComponent', () => {
  let component: SectionEmphasisComponent;
  let fixture: ComponentFixture<SectionEmphasisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionEmphasisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionEmphasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
