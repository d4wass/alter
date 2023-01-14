import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';

@Component({
  selector: 'app-reservation-user-list',
  template: ` <div></div> `,
  styleUrls: ['./reservation-user-list.component.scss']
})
export class ReservationUserListComponent implements OnInit {
  @Input() reservations!: any[];
  populatedReservations!: any[];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.populateReservation();
  }

  populateReservation(): void {
    this.store.dispatch(
      ReservationActions.populateUserReservations({ reservations: this.reservations })
    );
  }
}
