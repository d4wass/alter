import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, merge, of, tap } from 'rxjs';
import { VehicleService } from 'src/services/vehicle-service/vehicle.service';
import { UserVehiclesActions } from './user-vehicles.actions';

@Injectable()
export class UserVehiclesEffects {
  getUserVehicle = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(UserVehiclesActions.getVehicles),
        tap((x) => console.log(x)),
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

  constructor(private actions$: Actions, private vehicleService: VehicleService) {}
}
