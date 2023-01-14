import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { PopulatedReservation } from 'src/+state/models/reservation.model';
import { VehicleQuery } from 'src/+state/models/vehicle.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';
import { UserActions } from 'src/+state/user/user.actions';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';

@UntilDestroy()
@Component({
  selector: 'app-reservation-vehicle-modal',
  template: `
    <div class="wrapper">
      <div class="content">
        <h3>Your reservation</h3>
        <div class="info">
          <div class="owner-data"></div>
          <div class="user-data"></div>
          <div class="reservation-data"></div>
        </div>
        <div>
          <button (click)="handleConfirm()">Confirm Reservation</button>
          <button (click)="handleCancel()">Cancel Reservation</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reservation-vehicle-view.component.scss']
})
export class ReservationVehicleViewComponent implements OnInit {
  reservation!: PopulatedReservation;
  reservationId!: string;
  vehicleQuery$!: Observable<VehicleQuery | undefined>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly vehicleFacade: VehicleFacade
  ) {}

  ngOnInit(): void {
    this.reservation = this.route.snapshot.data['reservation'];
    this.reservationId = this.reservation?._id;
    this.vehicleQuery$ = this.vehicleFacade.vehicleSearchQuery$;
    console.log(this.route);
    console.log(this.reservation);
    console.log(this.reservationId);
  }

  handleConfirm(): void {
    this.store.dispatch(
      ReservationActions.confirmUserReservation({
        reservationId: this.reservationId,
        hostId: this.reservation.host
      })
    );
  }

  handleCancel(): void {
    this.vehicleQuery$
      .pipe(
        filter((query) => !!query),
        map((query) => query as VehicleQuery),
        untilDestroyed(this)
      )
      .subscribe((query) =>
        this.store.dispatch(
          VehiclesActions.searchVehicles({
            query
          })
        )
      );
  }
  //TODO: get owner data from - backend
  //TODO: get user data from ngrx
  //TODO: get owner vehicle data - backend
}
