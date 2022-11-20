import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { UnshplashService, UnsplashImg } from 'src/services/unsplash-service/unshplash.service';

@Component({
  selector: 'app-searched-car-card',
  template: `
    <div class="wrapper" (click)="showVehicleDetails($event)">
      <div
        class="card-image"
        [ngStyle]="{
          'background-image': imageUrl$ | async,
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': '50%, 50%'
        }"
      ></div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./searched-car-card.component.scss']
})
export class SearchedCarCardComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Input() vehicleIndex!: number;
  @Input() image$!: Observable<string>;
  imageUrl$!: Observable<string>;

  constructor(
    private readonly unsplashService: UnshplashService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.image$ = this.getVehicleImg(this.vehicle);
    this.imageUrl$ = this.createBackgroundUrl();
  }

  showVehicleDetails(event: Event) {
    this.router.navigate([`vehicle/${this.vehicle._id}`]);
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

  private createBackgroundUrl() {
    return this.image$.pipe(map((image) => `url(${image})`));
  }
}
