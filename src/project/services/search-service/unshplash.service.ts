import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type UnsplashImg = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root'
})
export class UnshplashService {
  constructor(private readonly httpClient: HttpClient) {}

  //create env to hide this client ID
  public getPhoto(search: string, numberVehicle: number = 1): Observable<UnsplashImg> {
    return this.httpClient.get(
      `https://api.unsplash.com/search/photos?query=${search}:car&per_page=${numberVehicle}&client_id=T-W-w2ivUwapBQtaR42CcgIo4_3VIdCVc8zDSAarZvA`
    );
  }
}
