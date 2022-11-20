import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { Vehicle, VehicleQuery } from '../models/vehicle.model';
import { VehicleSelectors } from '../vehicles/vehicle.selectors';

@Injectable({ providedIn: 'root' })
export class VehicleFacade {
  allVehicles$: Observable<Vehicle[]> = this.store.pipe(select(VehicleSelectors.selectAllVehicles));
  isLoadingVehicles$: Observable<boolean> = this.store.pipe(
    select(VehicleSelectors.selectIsLoading)
  );
  vehicleSearchQuery$: Observable<VehicleQuery | undefined> = this.store.pipe(
    select(VehicleSelectors.selectVehicleQuery)
  );

  getIsVehicleFound(): Observable<boolean> {
    return this.store
      .pipe(select(VehicleSelectors.selectIsVehiclesFound))
      .pipe(map((vehicles) => vehicles.length !== 0));
  }

  constructor(public store: Store) {}
}
