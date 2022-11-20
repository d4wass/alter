import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/+state/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  createVehicleReservation(reservation: Reservation) {
    const response = this.http.post<{ reservationId: string }>(
      `http://localhost:3000/reservation/create-reservation`,
      {
        reservation
      }
    );

    return response;
  }

  appendReservation(reservationId: string) {
    const params = new HttpParams().set('id', reservationId);
    return this.http.get<{ populateReservation: any }>(
      `http://localhost:3000/reservation/confirm-reservation`,
      { params }
    );
  }
}
