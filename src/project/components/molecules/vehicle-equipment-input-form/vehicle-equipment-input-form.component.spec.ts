import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { dataTest } from '../../../../utils/data-test';
import { VehicleEquipmentInputFormComponent } from './vehicle-equipment-input-form.component';

describe('VehicleFeatureCheckboxInputFormComponent', () => {
  let component: VehicleEquipmentInputFormComponent;
  let spectator: Spectator<VehicleEquipmentInputFormComponent>;

  const createComponent = createComponentFactory({
    component: VehicleEquipmentInputFormComponent,
    imports: [ReactiveFormsModule, MatTooltipModule],
    schemas: [NO_ERRORS_SCHEMA],
    shallow: true
  });

  const selectors = {
    addBtn: () => spectator.query(dataTest('add-btn')),
    input: () => spectator.query(dataTest('input')),
    tooltip: () => spectator.query(dataTest('tooltip'))
  };

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

  describe('handleAdd()', () => {
    const event = new MouseEvent('click');

    it('should call handle add on btn click', () => {
      const spy = jest.spyOn(component, 'handleAdd');
      spectator.click(selectors.addBtn()!);

      spectator.detectChanges();
      expect(spy).toBeCalledWith(event);
    });

    it('should emit equipment array if control value is valid', () => {
      let result;
      const value = 'controlValue';

      component.control.setValue(value);
      spectator.detectComponentChanges();

      expect(component.control.value).toEqual(value);
      spectator.output('vehicleEquipment').subscribe((x) => (result = x));
      component.handleAdd(event);

      expect(component.control.value).toEqual('');
      expect(result).toEqual([value]);
    });

    it('should emit equipment array with only unique values', () => {
      const equipement = ['value1', 'value2'];
      const value = 'value1';

      component.equipment = equipement;
      component.control.setValue(value);
      spectator.detectComponentChanges();
      component.handleAdd(event);

      expect(component.equipment).toEqual(equipement);
    });

    it('should not emit vehicleEquipment if control value is invalid', () => {
      let result;
      const spy = jest.spyOn(component.vehicleEquipment, 'emit');

      component.control.setValue('');
      component.handleAdd(event);
      spectator.output('vehicleEquipment').subscribe((x) => (result = x));

      expect(result).toBeUndefined();
      expect(spy).not.toBeCalled();
    });

    it('should focus on input element on handleAdd call', () => {
      component.handleAdd(event);
      expect(selectors.input()).toBeFocused();
    });
  });
  describe('handleRemove()', () => {
    it('should emit vehicle equipment array without removed item', () => {
      const spy = jest.spyOn(component.vehicleEquipment, 'emit');
      component.equipment = ['value1', 'value2'];
      component.handleRemove(0);

      expect(spy).toBeCalledWith(['value2']);
    });
  });
  //TODO: create proper cdk-overlay unit test
  describe('tooltip', () => {
    it.each([
      ['', "You don't provide any value. Please enter equipement name"],
      ['   ', 'You provide incorrect value. Please enter equipement name'],
      ['value', 'You already add this value. Make sure your value is unique'],
      ['va', 'Provided value is too short']
    ])('should show tooltip for invalid values', (controlValue, tooltipMsg) => {
      const event = new MouseEvent('click');

      component.equipment = ['value'];
      component.control.setValue(controlValue);
      component.handleAdd(event);

      expect(selectors.tooltip).toBeTruthy();
    });
  });
});
