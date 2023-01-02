import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopulatedReservation } from 'src/+state/models/reservation.model';

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
          <button>Confirm Reservation</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reservation-vehicle-view.component.scss']
})
export class ReservationVehicleViewComponent implements OnInit {
  reservation!: PopulatedReservation;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reservation = this.route.snapshot.data['reservation'];
    console.log(this.route);
    console.log(this.reservation);
  }
  //TODO: get owner data from - backend
  //TODO: get user data from ngrx
  //TODO: get owner vehicle data - backend
}
