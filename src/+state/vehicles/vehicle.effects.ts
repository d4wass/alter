import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SearchService } from '../../project/services/search-service/search.service';
import { VehiclesActions } from './vehicle.actions';

@Injectable()
export class VehicleEffects {
  getVehicles = createEffect(() =>
    this.actions$.pipe(
      ofType(VehiclesActions.searchVehicles),
      switchMap(({ query }) =>
        this.searchService.searchVehicles(query).pipe(
          map((vehicles) => VehiclesActions.loadVehiclesSuccess({ vehicles })),
          tap(() => this.router.navigate(['/search'], { queryParams: { place: query } })),
          catchError((error) => of(VehiclesActions.loadVehiclesError({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private router: Router
  ) {}
}
