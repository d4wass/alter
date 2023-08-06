import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, merge, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { VehicleService } from 'src/services/vehicle-service/vehicle.service';
import { UserFacade } from '../facade/user/user.facade';
import { UserVehiclesActions } from './user-vehicles.actions';

@Injectable()
export class UserVehiclesEffects {
  getUserVehicle = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserVehiclesActions.getVehicles),
        exhaustMap(({ vehicles }) =>
          merge(
            ...vehicles.map((id: string | number) =>
              this.vehicleService.getVehicle(id).pipe(
                map((vehicle) => UserVehiclesActions.getVehiclesSucces({ vehicle })),
                catchError((error) => of(UserVehiclesActions.getVehiclesError({ error })))
              )
            )
          )
        )
      )
  );

  removeUserVehicle = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserVehiclesActions.removeVehicle),
        withLatestFrom(this.userFacade.userId$, this.userFacade.userToken$),
        tap((x) => console.log(x)),
        map(([{ vehicleId }, userId, token]) => ({ vehicleId, userId, token })),
        switchMap(({ vehicleId, userId, token }) =>
          this.vehicleService.removeVehicle(vehicleId, userId, token).pipe(
            map((user) => UserVehiclesActions.removeVehicleSuccess({ removed: user })),
            catchError((error) => of(UserVehiclesActions.removeVehicleError({ error })))
          )
        )
      )
  );

  constructor(
    private actions$: Actions,
    private vehicleService: VehicleService,
    private readonly userFacade: UserFacade
  ) {}
}
