import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { UserFacade } from 'src/+state/facade/user.facade';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { Vehicle, VehicleQuery } from 'src/+state/models/vehicle.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';
import moment from 'moment';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleViewComponent implements OnInit {
  vehicle?: Vehicle;
  owner?: any;
  imageUrl?: string;
  isAuthorized?: boolean;
  userId?: string;
  query?: VehicleQuery;
  isOwner?: Observable<boolean>;
  drive?: string;
  gearbox?: string;
  equipment?: string[];
  fromDate: FormControl<string> = new FormControl('', Validators.required);
  endDate: FormControl<string> = new FormControl('', Validators.required);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly userFacade: UserFacade,
    private readonly vehicleFacade: VehicleFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.isAuthorized$.subscribe((isAuthorized) => (this.isAuthorized = isAuthorized));
    this.vehicle = this.route.snapshot.data['vehicle'];
    this.route.queryParams.subscribe((x) => (this.imageUrl = x.img));
    this.userFacade.userId$.subscribe((id) => (this.userId = id));
    this.vehicleFacade.vehicleSearchQuery$.subscribe((query) => (this.query = query));
    this.setIsOwner();
    this.setTripDates(this.query);

    console.log(this.vehicle);

    if (this.vehicle) {
      this.drive = this.getVehicleFeature(this.vehicle?.features.drive);
      this.gearbox = this.getVehicleFeature(this.vehicle?.features.gearbox);
      if (this.vehicle?.features.equipment) {
        this.equipment = this.getVehicleEquipment(this.vehicle?.features.equipment);
      }
    }

    console.log(this.drive);
    console.log(this.equipment);
  }

  bookVehicle() {
    const reservation = {
      vehicleId: this.vehicle?._id,
      userId: this.userId,
      hostId: this.vehicle?.owner,
      fromDate: moment(this.fromDate.value, 'YYYY-MM-DDT00:00:00.000').format('DD.MM.YYYY'),
      endDate: moment(this.endDate.value, 'YYYY-MM-DDT00:00:00.000').format('DD.MM.YYYY'),
      price: this.vehicle?.price
    };

    if (this.isAuthorized) {
      this.store.dispatch(ReservationActions.createReservation({ reservation }));
    } else {
      this.store.dispatch(AppActions.openModal({ isLoginModalOpen: true }));
    }
  }

  getEquipmentValue(item: any) {
    const key = Object.keys(item)[0];
    const value = item[key];
    console.log(key, value);
    if (key === value) {
      return value;
    } else if (value === undefined) {
      return `${key}: not specified`;
    } else {
      return `${key}: ${value}`;
    }
  }

  private setTripDates(query: VehicleQuery | undefined): void {
    if (query) {
      this.fromDate.setValue(
        moment(query.fromDate, 'DD.MM.YYYY').format('YYYY-MM-DDT00:00:00.000') + 'Z'
      );
      this.endDate.setValue(
        moment(query.endDate, 'DD.MM.YYYY').format('YYYY-MM-DDT00:00:00.000') + 'Z'
      );
    } else {
      this.fromDate.setValue(new Date().toISOString());
      this.endDate.setValue(new Date().toISOString());
    }
  }

  private setIsOwner(): void {
    this.isOwner = this.userFacade.userId$.pipe(
      take(1),
      map((userId) => userId === this.vehicle?.owner)
    );
  }

  private getVehicleFeature(feature: any): string | undefined {
    let type;

    for (const [key, value] of Object.entries(feature)) {
      if (value === true) {
        console.log([key, value]);
        type = key;
      }
    }

    return type;
  }

  private getVehicleEquipment(feature: any): string[] | undefined {
    const { cruiseControl, lights, parkingAssist } = feature;
    let type: any[] = [];

    for (const [key, value] of Object.entries(feature)) {
      if (value === true) {
        console.log([key, value]);
        type.push({ [key]: key });
      }
    }

    type.push({
      cruiseControl: this.equipmentSelector(cruiseControl)
    });
    type.push({
      lights: this.equipmentSelector(lights)
    });
    type.push({
      parkingAssist: this.equipmentSelector(parkingAssist)
    });

    return type;
  }

  private equipmentSelector(equipment: any) {
    for (const [key, value] of Object.entries(equipment)) {
      if (value === true) {
        console.log([key, value]);
        return key;
      }
    }
    return undefined;
  }
}
