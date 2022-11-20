import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs';
import { ReservationService } from 'src/services/reservation-service/reservation.service';
import { ReservationActions } from './reservation.actions';

@Injectable()
export class ReservationEffects {
  createReservation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.createReservation),
        tap((x) => console.log(x)),
        switchMap(({ reservation }) => {
          console.log('switch map', reservation);
          return this.reservationService.createVehicleReservation(reservation).pipe(
            map(({ reservationId }) => {
              console.log('map after service', reservation);
              return ReservationActions.createReservationSuccess({ reservationId });
            }),
            catchError(async (error) => ReservationActions.createReservationError({ error }))
          );
        })
      )
  );

  appendUserReservation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.createReservationSuccess),
        tap(({ reservationId }) => this.reservationService.appendReservation(reservationId))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private reservationService: ReservationService) {}
}
