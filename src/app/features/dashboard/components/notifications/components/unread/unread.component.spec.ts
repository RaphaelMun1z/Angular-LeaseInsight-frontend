import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadComponent } from './unread.component';

describe('UnreadComponent', () => {
  let component: UnreadComponent;
  let fixture: ComponentFixture<UnreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnreadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
