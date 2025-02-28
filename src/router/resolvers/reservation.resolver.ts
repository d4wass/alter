import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PopulatedReservation } from 'src/+state/models/reservation.model';
import { ReservationService } from 'src/services/reservation-service/reservation.service';

@Injectable()
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PopulatedReservation> {
    const id = route.paramMap.get('id');
    return this.reservationService.getReservation(id).pipe(map((x) => x.populateReservation));
  }
}
