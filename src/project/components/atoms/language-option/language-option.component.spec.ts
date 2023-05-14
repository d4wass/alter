import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageOptionComponent } from './language-option.component';

//TODO: unfinished translation service try to implement

describe('LanguageOptionComponent', () => {
  let component: LanguageOptionComponent;
  let fixture: ComponentFixture<LanguageOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageOptionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
