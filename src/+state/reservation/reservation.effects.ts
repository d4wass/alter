import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ReservationService } from 'src/services/reservation-service/reservation.service';
import { UserFacade } from '../facade/user.facade';
import { ReservationActions } from './reservation.actions';

@Injectable()
export class ReservationEffects {
  createReservation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.createReservation),
        switchMap(({ reservation }) => {
          return this.reservationService.createVehicleReservation(reservation).pipe(
            map(({ reservationId }) => {
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
        tap(({ reservationId }) => this.router.navigate([`confirm-reservation/${reservationId}`]))
      ),
    { dispatch: false }
  );

  confirmUserReservation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.confirmUserReservation),
        withLatestFrom(this.userFacade.userToken$, this.userFacade.userId$),
        switchMap(([{ reservationId }, token, userId]) => {
          return this.reservationService.confirmReservation(reservationId, token, userId).pipe(
            map((reservation) => ReservationActions.confirmUserReservationSuccess({ reservation })),
            catchError(async (error) => ReservationActions.confirmUserReservationError({ error }))
          );
        })
      )
  );

  cancelReservation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.cancelUserReservation),
        withLatestFrom(this.userFacade.userToken$, this.userFacade.userId$),
        switchMap(([{ reservationId, hostId }, token, userId]) => {
          return this.reservationService
            .cancelReservation(reservationId, token, userId, hostId)
            .pipe(
              map(() => ReservationActions.cancelUserReservationSuccess()),
              catchError(async (error) => ReservationActions.cancelUserReservationError({ error }))
            );
        })
      )
  );

  constructor(
    private actions$: Actions,
    private reservationService: ReservationService,
    private userFacade: UserFacade,
    private router: Router
  ) {}
}
