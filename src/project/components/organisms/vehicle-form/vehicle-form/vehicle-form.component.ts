import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';
import { UserActions } from '../../../../../+state/user/user.actions';
import { UserFacade } from '../../../../../+state/facade/user/user.facade';
import {
  VehicleFeaturesInformation,
  VehicleForm,
  VehicleMainInformation,
  VehicleSpecificationInformation
} from '../vehicle-form.model';

@Component({
  selector: 'app-vehicle-form',
  template: `
    <div class="wrapper">
      <form [formGroup]="form">
        <app-vehicle-form-main-data
          [formGroupCtrl]="form.get('vehicleMainInfo')"
        ></app-vehicle-form-main-data>
        <app-vehicle-form-spec-data
          [formGroupCtrl]="form.get('vehicleSpecInfo')"
        ></app-vehicle-form-spec-data>
        <app-vehicle-form-features-data
          [formGroupCtrl]="form.get('vehicleFeaturesInfo')"
        ></app-vehicle-form-features-data>
        <button (click)="handleSubmitVehicle()" data-test="submit-btn">add vehicle</button>
      </form>
      <app-vehicle-success-create-modal
        [isCreated]="isCreated$ | async"
        (handleClick)="resetFormAfterCreation()"
      ></app-vehicle-success-create-modal>
    </div>
  `,
  styleUrls: ['./vehicle-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleFormComponent {
  isCreated$: Observable<boolean> = this.userFacade.isVehicleCreated();

  brandCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  modelCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  placeCtrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  priceCtrl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  descriptionCtrl = new FormControl('');

  unitsCtrl = new FormControl('', Validators.required);
  quantityCtrl = new FormControl('', Validators.required);
  fuelTypeCtrl = new FormControl('', Validators.required);
  doorsCtrl = new FormControl(0, Validators.required);
  seatsCtrl = new FormControl(0, Validators.required);

  fuelConsumption = new FormGroup({
    units: this.unitsCtrl,
    quantity: this.quantityCtrl
  });

  capacityCtrl = new FormControl('', [Validators.required]);
  powerCtrl = new FormControl(null, [Validators.required]);
  gearboxCtrl = new FormControl<string>('', Validators.required);
  driveCtrl = new FormControl<string>('', Validators.required);
  equipmentCtrl = new FormControl<string[]>([]);

  engine = new FormGroup({
    capacity: this.capacityCtrl,
    power: this.powerCtrl
  });

  vehicleMainInformation = new FormGroup<VehicleMainInformation>({
    brand: this.brandCtrl,
    model: this.modelCtrl,
    place: this.placeCtrl,
    price: this.priceCtrl,
    description: this.descriptionCtrl
  });
  vehicleSpecificationInformation = new FormGroup<VehicleSpecificationInformation>({
    fuelConsumption: this.fuelConsumption,
    fuelType: this.fuelTypeCtrl,
    doors: this.doorsCtrl,
    seats: this.seatsCtrl
  });
  vehicleFeaturesInformation = new FormGroup<VehicleFeaturesInformation>({
    engine: this.engine,
    gearbox: this.gearboxCtrl,
    drive: this.driveCtrl,
    equipment: this.equipmentCtrl
  });

  form = new FormGroup<VehicleForm>({
    vehicleMainInfo: this.vehicleMainInformation,
    vehicleSpecInfo: this.vehicleSpecificationInformation,
    vehicleFeaturesInfo: this.vehicleFeaturesInformation
  });

  constructor(
    private readonly store: Store,
    private readonly userFacade: UserFacade,
    private readonly router: Router
  ) {}

  handleSubmitVehicle(): void {
    this.form.value$
      .pipe(take(1))
      .subscribe((vehicle) => this.store.dispatch(UserActions.addUserVehicle({ vehicle })));
  }

  resetFormAfterCreation(): void {
    this.userFacade
      .isVehicleCreated()
      .pipe(
        tap((x) => console.log(x)),
        filter((isCreated) => isCreated),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(UserActions.vehicleResetForm());
        this.router.navigate([`profile`]);
        this.form.reset();
      });
  }
}
