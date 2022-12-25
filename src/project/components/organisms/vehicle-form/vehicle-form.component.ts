import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { filter, map, take, withLatestFrom } from 'rxjs';
import { UserActions } from 'src/+state/user/user.actions';
import {
  IVehicleBasicData,
  IVehicleFeaturesData,
  IVehicleSpecificationData
} from 'src/project/model/vehicle-form-models/vehicle-forms.model';
import { UserFacade } from '../../../../+state/facade/user.facade';

@Component({
  selector: 'app-vehicle-form',
  template: `
    <div class="wrapper">
      <form [formGroup]="vehicleForm">
        <app-vehicle-form-main-data
          [formGroupCtrl]="vehicleForm.get('vehicleMainInfo')"
        ></app-vehicle-form-main-data>
        <app-vehicle-form-spec-data
          [formGroupCtrl]="vehicleForm.get('vehicleSpecInfo')"
        ></app-vehicle-form-spec-data>
        <app-vehicle-form-features-data
          [formGroupCtrl]="vehicleForm.get('vehicleFeaturesInfo')"
        ></app-vehicle-form-features-data>
        <button (click)="handleSubmitVehicle()">add vehicle</button>
      </form>
    </div>
  `,
  styleUrls: ['./vehicle-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleFormComponent {
  vehicleForm: FormGroup<ControlsOf<any>> = new FormGroup<ControlsOf<any>>({
    vehicleMainInfo: new FormGroup<ControlsOf<IVehicleBasicData>>({
      brand: new FormControl('', [Validators.required, Validators.minLength(3)]),
      model: new FormControl('', [Validators.required, Validators.minLength(3)]),
      place: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl('')
    }),
    vehicleSpecInfo: new FormGroup<ControlsOf<IVehicleSpecificationData>>({
      fuelConsumption: new FormGroup<{ units: FormControl<string>; quantity: any }>({
        units: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required)
      }),
      fuelType: new FormControl('', Validators.required),
      doors: new FormControl(0, Validators.required),
      seats: new FormControl(0, Validators.required)
    }),
    vehicleFeaturesInfo: new FormGroup<ControlsOf<IVehicleFeaturesData>>({
      engine: new FormGroup<{ capacity: FormControl<string>; power: FormControl<number | null> }>({
        capacity: new FormControl('', [Validators.required]),
        power: new FormControl(null, [Validators.required])
      }),
      gearbox: new FormControl<string>('manual', Validators.required),
      drive: new FormControl<string>('rear', Validators.required),
      //rid off that any types
      equipment: new FormGroup<ControlsOf<any>>({
        appleCarPlay: new FormControl(false),
        androidAuto: new FormControl(false),
        bluetooth: new FormControl(false),
        usb: new FormControl(false),
        headUpDisplay: new FormControl(false),
        navigation: new FormControl(false),
        airConditioning: new FormControl(false),
        keyLess: new FormControl(false),
        isofix: new FormControl(false),
        cruiseControl: new FormGroup<{
          standard: FormControl<boolean>;
          active: FormControl<boolean>;
          adaptive: FormControl<boolean>;
          autonomic: FormControl<boolean>;
        }>({
          standard: new FormControl(false),
          active: new FormControl(false),
          adaptive: new FormControl(false),
          autonomic: new FormControl(false)
        }),
        lights: new FormGroup<{
          led: FormControl<boolean>;
          xenon: FormControl<boolean>;
          biXenon: FormControl<boolean>;
          laser: FormControl<boolean>;
        }>({
          led: new FormControl(false),
          xenon: new FormControl(false),
          biXenon: new FormControl(false),
          laser: new FormControl(false)
        }),
        parkingAssist: new FormGroup<{
          camera: FormControl<boolean>;
          camera360: FormControl<boolean>;
          autonomic: FormControl<boolean>;
        }>({
          camera: new FormControl(false),
          camera360: new FormControl(false),
          autonomic: new FormControl(false)
        })
      })
    })
  });

  constructor(private readonly store: Store, private readonly userFacade: UserFacade) {}

  handleSubmitVehicle(): void {
    this.vehicleForm.value$
      .pipe(take(1))
      .subscribe((vehicle) => this.store.dispatch(UserActions.addUserVehicle({ vehicle })));
  }
}
