import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/+state/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private readonly http: HttpClient) {}

  createVehicleReservation(reservation: Reservation) {
    return this.http.post<Reservation>(`http://localhost:3000/create-reservation`, {
      ...reservation
    });
  }
}
