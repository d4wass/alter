import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { UserFacade } from 'src/+state/facade/user.facade';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { Vehicle, VehicleQuery } from 'src/+state/models/vehicle.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleViewComponent implements OnInit {
  vehicle?: Vehicle;
  isAuthorized?: boolean;
  userId?: string;
  query?: VehicleQuery;
  isOwner?: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly userFacade: UserFacade,
    private readonly vehicleFacade: VehicleFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.isAuthorized$.subscribe((isAuthorized) => (this.isAuthorized = isAuthorized));
    this.vehicle = this.route.snapshot.data['vehicle'];
    console.log(this.vehicle);
    this.userFacade.userId$.subscribe((id) => (this.userId = id));
    this.vehicleFacade.vehicleSearchQuery$.subscribe((query) => (this.query = query));
    this.setIsOwner();
  }

  bookVehicle() {
    const reservation = {
      vehicleId: this.vehicle?._id,
      userId: this.userId,
      hostId: this.vehicle?.owner,
      fromDate: this.query?.fromDate,
      endDate: this.query?.endDate
    };

    if (this.isAuthorized) {
      this.store.dispatch(ReservationActions.createReservation({ reservation }));
    } else {
      this.store.dispatch(AppActions.openModal({ isLoginModalOpen: true }));
    }
  }

  private setIsOwner(): void {
    this.isOwner = this.userFacade.userId$.pipe(
      take(1),
      map((userId) => userId === this.vehicle?.owner)
    );
  }
}
