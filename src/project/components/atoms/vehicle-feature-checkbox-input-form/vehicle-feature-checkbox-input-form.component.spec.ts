import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { VehicleFeatureCheckboxInputFormComponent } from './vehicle-feature-checkbox-input-form.component';

describe('VehicleFeatureCheckboxInputFormComponent', () => {
  let component: VehicleFeatureCheckboxInputFormComponent;
  let spectator: Spectator<VehicleFeatureCheckboxInputFormComponent>;

  const createComponent = createComponentFactory({
    component: VehicleFeatureCheckboxInputFormComponent,
    imports: [ReactiveFormsModule, MatCheckboxModule]
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
});
