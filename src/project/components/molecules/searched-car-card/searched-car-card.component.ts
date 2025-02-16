import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { UnshplashService, UnsplashImg } from 'src/services/unsplash-service/unshplash.service';

@UntilDestroy()
@Component({
    selector: 'app-searched-car-card',
    template: `
    <div class="wrapper" (click)="showVehicleDetails()">
      <div
        class="card-image"
        [ngStyle]="{
          'background-image': image$ | async,
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
    styleUrls: ['./searched-car-card.component.scss'],
    standalone: false
})
export class SearchedCarCardComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Input() vehicleIndex!: number;
  @Input() image$!: Observable<string>;
  imageUrl!: string;

  constructor(
    private readonly unsplashService: UnshplashService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.image$ = this.getVehicleImg(this.vehicle);
    this.createBackgroundUrl();
    console.log(this.vehicle);
  }

  showVehicleDetails() {
    this.router.navigate([`vehicle/${this.vehicle._id}`], { queryParams: { img: this.imageUrl } });
  }

  private getVehicleImg(vehicle: Vehicle): Observable<string> {
    return this.unsplashService
      .getPhoto(`${vehicle.brand} ${vehicle.model}`, this.vehicleIndex)
      .pipe(
        map((x: UnsplashImg) => {
          return `url(${x.results[this.vehicleIndex - 1].urls.small})`;
        })
      );
  }

  private createBackgroundUrl() {
    return this.image$.pipe(untilDestroyed(this)).subscribe((url) => (this.imageUrl = url));
  }
}
