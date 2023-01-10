import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopulatedReservation } from 'src/+state/models/reservation.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';
import { UserActions } from 'src/+state/user/user.actions';

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

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {}

  ngOnInit(): void {
    this.reservation = this.route.snapshot.data['reservation'];
    this.reservationId = this.reservation?._id;
    console.log(this.route);
    console.log(this.reservation);
    console.log(this.reservationId);
  }

  handleConfirm(): void {
    this.store.dispatch(
      ReservationActions.confirmUserReservation({ reservationId: this.reservationId })
    );
  }

  handleCancel(): void {
    this.store.dispatch(
      ReservationActions.cancelUserReservation({
        reservationId: this.reservationId,
        hostId: this.reservation.host.id
      })
    );
  }
  //TODO: get owner data from - backend
  //TODO: get user data from ngrx
  //TODO: get owner vehicle data - backend
}
