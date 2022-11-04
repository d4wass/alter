import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private readonly http: HttpClient) {}

  getVehicle(id: string | null): Observable<Vehicle> {
    return this.http.get<Vehicle>(`http://localhost:3000/vehicle/${id}`);
  }
}
