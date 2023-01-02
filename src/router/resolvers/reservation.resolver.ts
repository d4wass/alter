import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PopulatedReservation, Reservation } from 'src/+state/models/reservation.model';
import { ReservationService } from 'src/services/reservation-service/reservation.service';

@Injectable()
export class ReservationResolver implements Resolve<PopulatedReservation> {
  constructor(private readonly reservationService: ReservationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PopulatedReservation | any> {
    const id = route.paramMap.get('id');
    return this.reservationService.getReservation(id);
  }
}
