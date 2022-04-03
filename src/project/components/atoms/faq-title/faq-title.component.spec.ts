import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTitleComponent } from './faq-title.component';

describe('FaqTitleComponent', () => {
  let component: FaqTitleComponent;
  let fixture: ComponentFixture<FaqTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqTitleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
