import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputFormComponent } from './input-form.component';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let input: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    input = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Inputs', () => {
    it('should set [type] to value passed in Input ', () => {
      component.type = 'number';
      fixture.detectChanges();

      expect(input.attributes.type).toBe('number');
    });

    it('should set default [type] value when Input not provide it', () => {
      expect(input.attributes.type).toBe('text');
    });

    it('should set [placeholder] to value passed in Input', () => {
      component.placeholder = 'placeholder';
      fixture.detectChanges();

      expect(input.attributes.placeholder).toBe('placeholder');
    });

    it('should set [className] to value passed in Input', () => {
      component.className = 'classname';
      fixture.detectChanges();

      expect(input.nativeElement.className).toBe('classname');
    });

    it('should set [className] default value when Input not provide it', () => {
      expect(input.nativeElement.className).toBe('input');
    });
  });
});
