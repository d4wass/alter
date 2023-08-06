import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { dataTest } from '../../../../utils/data-test';
import { VehicleEquipmentItemComponent } from './vehicle-equipment-item.component';

describe('VehicleEquipmentItemComponent', () => {
  let component: VehicleEquipmentItemComponent;
  let spectator: Spectator<VehicleEquipmentItemComponent>;

  const createComponent = createComponentFactory({
    component: VehicleEquipmentItemComponent,
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  const selectors = {
    eqTitle: () => spectator.query(dataTest('title')),
    removeBtn: () => spectator.query(dataTest('remove-btn'))
  };

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('VehicleEquipmentItem', () => {
    it('should show equipment value', () => {
      const value = 'equipment';
      component.equipment = value;

      spectator.detectChanges();

      expect(component.equipment).toEqual(value);
      expect(selectors.eqTitle()).toHaveText(value);
    });

    it('should emit value on closeClick method call', () => {
      let e: any;
      const spy = jest.spyOn(component.handleClose, 'emit');
      component.closeClick(e);

      expect(spy).toHaveBeenCalledWith(e);
    });

    it('should emit value onn btn click', () => {
      const spy = jest.spyOn(component, 'closeClick');
      spectator.dispatchMouseEvent('.remove-btn', 'click');

      expect(spy).toHaveBeenCalled();
    });
  });
});
