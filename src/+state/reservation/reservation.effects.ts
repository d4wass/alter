import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  merge,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { ReservationService } from 'src/services/reservation-service/reservation.service';
import { UserFacade } from '../facade/user/user.facade';
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
        switchMap(([{ reservationId, hostId }, token, userId]) => {
          return this.reservationService
            .confirmReservation(reservationId, token, userId, hostId)
            .pipe(
              map((reservation) =>
                ReservationActions.confirmUserReservationSuccess({ reservation })
              ),
              catchError(async (error) => ReservationActions.confirmUserReservationError({ error }))
            );
        })
      )
  );

  redirectConfirmReservationSuccess = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.confirmUserReservationSuccess),
        tap(() => {
          this.router.navigate(['/', 'profile']);
        })
      ),
    { dispatch: false }
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

  populateReservations = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(ReservationActions.populateUserReservations),
        exhaustMap(({ reservations }) =>
          merge(
            ...reservations.map((id) =>
              this.reservationService.getReservation(id).pipe(
                map((populateReservation) =>
                  ReservationActions.populateUserReservationsSuccess({
                    populatedReservations: populateReservation
                  })
                ),
                catchError((error) =>
                  of(ReservationActions.populateUserReservationsError({ error }))
                )
              )
            )
          )
        )
      )
  );

  constructor(
    private actions$: Actions,
    private reservationService: ReservationService,
    private userFacade: UserFacade,
    private router: Router
  ) {}
}
