import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchVehicles(
    place: string,
    fromDate: string,
    fromHour: string,
    endDate: string,
    endHour: string
  ) {
    console.log(place, fromDate, fromHour, endDate, endHour);

    this.http
      .get('http://localhost:3000/search', {
        params: { place }
      })
      .subscribe((response) => console.log('search query', response));
  }
}
