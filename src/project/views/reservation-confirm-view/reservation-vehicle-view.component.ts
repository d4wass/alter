import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { PopulatedReservation } from 'src/+state/models/reservation.model';
import { VehicleQuery } from 'src/+state/models/vehicle.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';

@UntilDestroy()
@Component({
  selector: 'app-reservation-vehicle-modal',
  template: `
    <div class="wrapper">
      <div class="content">
        <h3>Your reservation</h3>
        <div class="divider"></div>
        <div class="info">
          <div class="owner-data">
            <div class="paragraph-container">
              <p class="bold">host:</p>
              <p>
                {{ reservation.host.firstName }} {{ reservation.host.lastName?.substring(0, 1) }}
              </p>
            </div>
            <div class="paragraph-container">
              <p class="bold">vehicle:</p>
              <p>{{ reservation.vehicle.brand }} {{ reservation.vehicle.model }}</p>
            </div>
          </div>
          <div class="user-data"></div>
          <div class="reservation-data">
            <div class="paragraph-container">
              <p class="bold">Cost:</p>
              <p>{{ reservation.cost }} $</p>
            </div>
            <div class="paragraph-container">
              <p class="bold">Rental start:</p>
              <p>{{ reservation.fromDate }}</p>
            </div>
            <div class="paragraph-container">
              <p class="bold">Rental ends:</p>
              <p>{{ reservation.endDate }}</p>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="cta-container">
          <app-profile-btn (handleClickEvent)="handleConfirm()"
            >Confirm Reservation</app-profile-btn
          >
          <app-profile-btn (handleClickEvent)="handleCancel()">Cancel Reservation</app-profile-btn>
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
}
