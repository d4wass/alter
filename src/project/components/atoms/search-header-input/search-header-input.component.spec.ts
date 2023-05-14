import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { dataTest } from '../../../../utils/data-test';
import { SearchHeaderInputComponent } from './search-header-input.component';

describe('SearchHeaderInputComponent', () => {
  let component: SearchHeaderInputComponent;
  let spectator: Spectator<SearchHeaderInputComponent>;

  const selectors = {
    input: () => spectator.query(dataTest('search-input')),
    label: () => spectator.query(dataTest('search-label'))
  };

  const createComponent = createComponentFactory({
    component: SearchHeaderInputComponent,
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ReactiveFormsModule],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Inputs', () => {
    it('should display label element when (labelValue) is truthy', () => {
      const labelValue = 'label';

      component.labelValue = labelValue;
      spectator.detectChanges();

      expect(component.labelValue).toEqual(labelValue);
      expect(selectors.label()).toBeTruthy();
      expect(selectors.label()).toHaveText(labelValue);
    });

    describe('(placeholderValue)', () => {
      it('should set @Input to given value and show placeholder for input', () => {
        const placeholderValue = 'placeholderValue';
        const input = selectors.input();

        component.placeholderValue = placeholderValue;
        spectator.detectChanges();

        expect(component.placeholderValue).toEqual(placeholderValue);
        expect(input?.getAttribute('placeholder')).toEqual(placeholderValue);
      });

      it('should not show placeholder for input if @Input is undefined', () => {
        const input = selectors.input();
        expect(component.placeholderValue).toBeUndefined();
        expect(input?.getAttribute('placeholder')).toBeFalsy();
      });
    });

    describe('(typeValue)', () => {
      it('should set @Input to given value', () => {
        const typeValue = 'number';
        component.typeValue = typeValue;
        spectator.detectChanges();

        expect(component.typeValue).toEqual(typeValue);
      });

      it('should set (typeValue) to text when control is undefined', () => {
        expect(component.typeValue).toEqual('text');
      });
    });

    describe('(control)', () => {
      it('should set empty input when control have init value', () => {
        const input = selectors.input();
        expect(input).toHaveValue('');
      });

      it('should set value for input when control gets new value', () => {
        const input = selectors.input();

        component.control.setValue('value');
        spectator.detectChanges();

        expect(input).toHaveValue('value');
      });
    });
  });
});
