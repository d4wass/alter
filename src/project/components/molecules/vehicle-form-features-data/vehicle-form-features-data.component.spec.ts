import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { VehicleFeaturesInformation } from '../../organisms/vehicle-form/vehicle-form.model';
import { VehicleEquipmentInputFormComponent } from '../vehicle-equipment-input-form/vehicle-equipment-input-form.component';

import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';

describe('VehicleFormFeaturesDataComponent', () => {
  let component: VehicleFormFeaturesDataComponent;
  let vehicleEquipmentFormComponent: VehicleEquipmentInputFormComponent | null;
  let spectator: Spectator<VehicleFormFeaturesDataComponent>;

  const createComponent = createComponentFactory({
    component: VehicleFormFeaturesDataComponent,
    imports: [ReactiveFormsModule],
    declarations: [MockComponent(VehicleEquipmentInputFormComponent)],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        formGroupCtrl: new FormGroup<VehicleFeaturesInformation>({
          engine: new FormGroup({
            capacity: new FormControl(''),
            power: new FormControl('')
          }) as FormGroup<any>,
          gearbox: new FormControl(''),
          drive: new FormControl(''),
          equipment: new FormControl([])
        })
      }
    });
    component = spectator.component;
    vehicleEquipmentFormComponent = spectator.query(VehicleEquipmentInputFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  describe('ngOnInit()', () => {
    it('should set up ctrls on init of component', () => {
      component.ngOnInit();
      spectator.detectComponentChanges();

      expect(component.equipmentCtrl).toBeDefined();
      expect(component.driveCtrl).toBeDefined();
      expect(component.gearboxCtrl).toBeDefined();
    });
  });
  describe('@Output', () => {
    it('should call handleEquipment() on vehicleEquipment emit', () => {
      const spy = jest.spyOn(component, 'handleEquipment');
      vehicleEquipmentFormComponent?.vehicleEquipment.emit();

      expect(spy).toBeCalled();
    });
  });
});
