import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FaqTitleComponent } from './faq-title.component';

describe('FaqTitleComponent', () => {
  let component: FaqTitleComponent;
  let fixture: ComponentFixture<FaqTitleComponent>;
  let title: DebugElement;
  let titleNumber: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqTitleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTitleComponent);
    component = fixture.componentInstance;
    title = fixture.debugElement.query(By.css('.title-text'));
    titleNumber = fixture.debugElement.query(By.css('.title-number'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Inputs', () => {
    it('should set [title] to passed value', () => {
      component.title = 'title';
      fixture.detectChanges();

      expect(title.nativeElement.textContent.trim()).toBe('title');
    });
    it('should set [titleNumber] to passed value', () => {
      component.titleNumber = 20;
      fixture.detectChanges();

      expect(titleNumber.nativeElement.textContent.trim()).toBe('021');
    });
  });
});
