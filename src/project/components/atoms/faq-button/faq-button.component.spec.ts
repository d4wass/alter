import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FaqButtonComponent } from './faq-button.component';

describe('FaqButtonComponent', () => {
  let component: FaqButtonComponent;
  let fixture: ComponentFixture<FaqButtonComponent>;
  let btn: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    btn = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('(isOpenEvent)', () => {
    it('should emit event on click', () => {
      const isOpen = component.isOpen;
      jest.spyOn(component.isOpenEvent, 'emit');

      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOpenEvent.emit).toHaveBeenCalledWith(!isOpen);
    });

    it('should emit isOpenEvent with false when isOpen is set to true', () => {
      component.isOpen = true;
      jest.spyOn(component.isOpenEvent, 'emit');

      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOpenEvent.emit).toHaveBeenCalledWith(false);
    });

    it('should emit isOpenEvent with true when isOpen is set to false', () => {
      jest.spyOn(component.isOpenEvent, 'emit');

      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOpenEvent.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('handleOpen()', () => {
    it('should call fn on click', () => {
      jest.spyOn(component, 'handleOpen');

      btn.triggerEventHandler('click', {});

      expect(component.handleOpen).toBeCalled();
    });
    it('should change isOpen from false to true on fn call', () => {
      jest.spyOn(component, 'handleOpen');

      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOpen).toBe(true);
    });
    it('should change isOpen from true to false on fn call', () => {
      component.isOpen = true;
      jest.spyOn(component, 'handleOpen');

      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.isOpen).toBe(false);
    });
  });
});
