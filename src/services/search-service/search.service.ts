import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { VehicleQuery } from 'src/+state/models/vehicle.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchVehicles(query: VehicleQuery): Observable<Vehicle[]> {
    const { place, fromDate, endDate } = query;
    const params = new HttpParams({
      fromObject: {
        place,
        fromDate,
        endDate
      }
    });

    return this.http.get<Vehicle[]>(`${this.apiUrl}/search`, { params });
  }
}
