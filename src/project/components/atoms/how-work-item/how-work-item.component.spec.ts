import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorkItemComponent } from './how-work-item.component';

describe('HowWorkItemComponent', () => {
  let component: HowWorkItemComponent;
  let fixture: ComponentFixture<HowWorkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowWorkItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowWorkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
