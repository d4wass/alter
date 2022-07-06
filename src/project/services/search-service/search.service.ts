import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchVehicles(place: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>('http://localhost:3000/search', {
      params: { place }
    });
  }
}
