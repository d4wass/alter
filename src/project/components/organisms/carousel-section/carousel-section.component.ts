import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarCardType, CardData, ReviewCardType } from 'src/project/model/customer-card.model';
import { CarouselEnum } from './carousel.utils';

@Component({
    selector: 'app-carousel-section',
    template: `
    <div class="carousel-section">
      <h1>{{ title }}</h1>
      <div class="carousel-content" appCarouselAnimation>
        <div class="nav-btn-prev" #carouselPrevBtn>
          <img src="assets/angle-left.svg" />
        </div>
        <ng-container [ngSwitch]="carouselType">
          <div class="car-card-wrapper" [class.spinner-active]="isLoading$ | async" #carouselItems>
            <ng-container *ngSwitchCase="CarouselEnum.CarCarousel">
              <ng-container *ngIf="items && items.length > 0; else loading">
                <app-car-card *ngFor="let item of items" [carCard]="item"></app-car-card>
              </ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="CarouselEnum.ReviewCarousel">
              <ng-container *ngIf="items && items.length > 0; else loading">
                <app-review-card *ngFor="let item of items" [review]="item"></app-review-card>
              </ng-container>
            </ng-container>
          </div>
        </ng-container>
        <div class="nav-btn-next" #carouselNextBtn>
          <img src="assets/angle-right.svg" />
        </div>
      </div>
    </div>
    <ng-template #loading>
      <div class="carousel-spinner">
        <mat-spinner></mat-spinner>
      </div>
    </ng-template>
  `,
    styleUrls: ['./carousel-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CarouselSectionComponent {
  private _items!: Array<CardData<ReviewCardType | CarCardType>>;
  public get items(): Array<CardData<ReviewCardType | CarCardType>> {
    return this._items;
  }
  @Input()
  public set items(value: Array<CardData<ReviewCardType | CarCardType>>) {
    this._items = value;
    if (value) {
      this.isLoading$.next(false);
    }
  }
  @Input() title!: string;
  @Input() carouselType!: CarouselEnum;
  readonly CarouselEnum = CarouselEnum;
  readonly isLoading$ = new BehaviorSubject<boolean>(true);
}
