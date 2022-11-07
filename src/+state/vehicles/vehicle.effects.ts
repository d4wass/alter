import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ReservationService } from 'src/services/reservation-service/reservation.service';
import { SearchService } from '../../services/search-service/search.service';
import { VehiclesActions } from './vehicle.actions';

@Injectable()
export class VehicleEffects {
  getVehicles = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.searchVehicles),
      switchMap(({ query }) =>
        this.searchService.searchVehicles(query).pipe(
          tap(() =>
            this.router.navigate(['/search'], {
              queryParams: {
                place: query.place,
                fromDate: query.fromDate.date,
                endDate: query.endDate.date
              }
            })
          ),
          map((vehicles) => VehiclesActions.loadVehiclesSuccess({ vehicles })),
          catchError((error) => of(VehiclesActions.loadVehiclesError({ error })))
        )
      )
    )
  );

  createVehicleReservation = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.vehicleReservation),
      switchMap(({ reservation }) =>
        this.reservationService.createVehicleReservation(reservation).pipe(
          map((reservation) => VehiclesActions.vehicleReservationSuccess()),
          catchError(async (error) => VehiclesActions.loadVehiclesError({ error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private reservationService: ReservationService,
    private router: Router
  ) {}
}
