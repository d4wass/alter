import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopulatedReservation, Reservation } from 'src/+state/models/reservation.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createVehicleReservation(reservation: Reservation) {
    const response = this.http.post<{ reservationId: string }>(
      `${this.apiUrl}/reservation/create-reservation`,
      {
        reservation
      }
    );

    return response;
  }

  getReservation(reservationId: string | null) {
    return this.http.get<{ populateReservation: PopulatedReservation }>(
      `${this.apiUrl}/reservation/${reservationId}`
    );
  }

  confirmReservation(reservationId: string, token: string, userId: string, hostId: string) {
    return this.http.put<{ reservation: unknown }>(
      `${this.apiUrl}/reservation/confirm-reservation/${reservationId}`,
      { userId, hostId },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
    );
  }

  cancelReservation(reservationId: string, token: string, userId: string, hostId: string) {
    return this.http.delete<unknown>(`${this.apiUrl}/reservation/delete`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      body: { reservationId, userId, hostId }
    });
  }
}
