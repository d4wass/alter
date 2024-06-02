import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CarouselEnum } from './carousel.utils';

@Component({
  selector: 'app-carousel-section',
  template: `
    <div class="carousel-section">
      <h1>{{ carouselTitle }}</h1>
      <div class="carousel-content" appCarouselAnimation>
        <div class="nav-btn-prev" #carouselPrevBtn>
          <img src="assets/angle-left.svg" />
        </div>
        <ng-container *ngIf="carouselType === CarouselEnum.CarCarousel">
          <div class="car-card-wrapper" #carouselItems>
            <app-car-card *ngFor="let item of items" [carCard]="item"></app-car-card>
          </div>
        </ng-container>
        <ng-container *ngIf="carouselType === CarouselEnum.ReviewCarousel">
          <div class="review-card-wrapper" #carouselItems>
            <app-review-card *ngFor="let item of items" [review]="item"></app-review-card>
          </div>
        </ng-container>
        <div class="nav-btn-next" #carouselNextBtn>
          <img src="assets/angle-right.svg" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./carousel-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSectionComponent implements OnInit {
  @Input() carouselItems!: any[];
  @Input() carouselTitle!: string;
  @Input() carouselType!: CarouselEnum;
  CarouselEnum = CarouselEnum;
  items!: any[];

  ngOnInit(): void {
    this.items = this.carouselItems;
  }
}
