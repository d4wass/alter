import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { VehicleQuery } from 'src/+state/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchVehicles(query: VehicleQuery): Observable<Vehicle[]> {
    const { place, fromDate, endDate } = query;
    let params = new HttpParams({
      fromObject: {
        place,
        fromDate,
        endDate
      }
    });

    return this.http.get<Vehicle[]>('http://localhost:3000/search', { params });
  }
}
