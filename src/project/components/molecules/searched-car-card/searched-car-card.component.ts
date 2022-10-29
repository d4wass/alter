import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { Vehicle } from 'src/+state/models/vehicle.model';
import {
  UnshplashService,
  UnsplashImg
} from 'src/project/services/search-service/unshplash.service';

@Component({
  selector: 'app-searched-car-card',
  template: `
    <div class="wrapper">
      <div class="card-image">
        <img [src]="image$ | async" alt="car photo" />
      </div>
      <div class="card-content">
        <div class="card-info">
          <h3>{{ vehicle.brand }} {{ vehicle.model }}</h3>
          <p>{{ vehicle.rate }}</p>
        </div>
        <div class="card-price">
          <div class="card-price-spec-offer"></div>
          <div class="card-price-estimation">
            <p>$ {{ vehicle.price }} /day</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./searched-car-card.component.scss']
})
export class SearchedCarCardComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Input() vehicleIndex!: number;
  @Input() image$!: Observable<string>;

  constructor(private unsplashService: UnshplashService) {}

  ngOnInit(): void {
    this.image$ = this.getVehicleImg(this.vehicle);
  }

  private getVehicleImg(vehicle: Vehicle): Observable<string> {
    return this.unsplashService
      .getPhoto(`${vehicle.brand} ${vehicle.model}`, this.vehicleIndex)
      .pipe(
        map((x: UnsplashImg) => {
          return x.results[this.vehicleIndex - 1].urls.small;
        })
      );
  }
}
