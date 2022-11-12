import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import {
  IVehicleBasicData,
  IVehicleSpecificationData
} from 'src/project/model/vehicle-form-models/vehicle-forms.model';

interface IVehicle {
  brand: string;
  model: string;
  place: string;
  price: number;
  rate?: number;
  specification: any;
  features: any;
  reviews: any[];
  extras: any[];
  description: string;
  isCancelFree: boolean;
  avalibility: any[];
}

@Component({
  selector: 'app-vehicle-form',
  template: `
    <div class="wrapper">
      <form>
        <app-vehicle-form-main-data
          [formGroupCtrl]="vehicleMainFormGroup"
        ></app-vehicle-form-main-data>
        <app-vehicle-form-spec-data
          [formGroupCtrl]="vehicleSpecFormGroup"
        ></app-vehicle-form-spec-data>
        <app-vehicle-form-features-data></app-vehicle-form-features-data>
      </form>
    </div>
  `,
  styleUrls: ['./vehicle-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleFormComponent {
  vehicleMainFormGroup = new FormGroup<ControlsOf<IVehicleBasicData>>({
    brand: new FormControl('', [Validators.required, Validators.minLength(3)]),
    model: new FormControl('', [Validators.required, Validators.minLength(3)]),
    place: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  });

  vehicleSpecFormGroup = new FormGroup<ControlsOf<IVehicleSpecificationData>>({
    fuelConsumption: new FormGroup<{ units: FormControl<string>; quantity: any }>({
      units: new FormControl(''),
      quantity: new FormControl('')
    }),
    fuelType: new FormControl(''),
    doors: new FormControl(0),
    seats: new FormControl(0)
  });

  constructor() {
    console.log(this.vehicleMainFormGroup);
  }
}
