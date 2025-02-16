import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { VehicleService } from 'src/services/vehicle-service/vehicle.service';

@Injectable()
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> {
    const id = route.paramMap.get('id');
    return this.vehicleService.getVehicle(id);
  }
}
