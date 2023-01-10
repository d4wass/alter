import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopulatedReservation, Reservation } from 'src/+state/models/reservation.model';

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

  getReservation(reservationId: string | null) {
    return this.http.get<{ populateReservation: PopulatedReservation }>(
      `http://localhost:3000/reservation/${reservationId}`
    );
  }

  confirmReservation(reservationId: string, token: string, userId: string) {
    return this.http.put<{ reservation: any }>(
      `http://localhost:3000/reservation/confirm-reservation/${reservationId}`,
      { userId },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
    );
  }

  cancelReservation(reservationId: string, token: string, userId: string, hostId: string) {
    return this.http.delete<any>(`http://localhost:3000/reservation/delete`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      body: { reservationId, userId, hostId }
    });
  }
}
