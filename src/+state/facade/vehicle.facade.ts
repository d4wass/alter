import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { VehicleSelectors } from '../vehicles/vehicle.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleFacade {
  allVehicles$: Observable<Vehicle[]> = this.store.pipe(select(VehicleSelectors.selectAllVehicles));
  isLoadingVehicles$: Observable<boolean> = this.store.pipe(
    select(VehicleSelectors.selectIsLoading)
  );

  constructor(public store: Store) {}

  getIsVehicleFound(): Observable<boolean> {
    return this.store.pipe(select(VehicleSelectors.selectIsVehicleFound)).pipe(
      map((x) => Boolean(x.length)),
      tap((x) => console.log(x))
    );
  }
}
