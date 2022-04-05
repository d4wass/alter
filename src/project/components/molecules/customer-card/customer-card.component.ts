import { Component, Input, OnInit } from '@angular/core';

export interface CustomerReview {
  img: string;
  name: string;
  surname: string;
  status: string;
  stats: { trips: number; joined: string };
  review: string;
  rate: number;
}

@Component({
  selector: 'app-review-card',
  template: `
    <div class="wrapper-card">
      <div class="content-card">
        <div class="header-card">
          <img src="assets/reviewUser.png" alt="" class="user-photo" />
          <div class="customer-info">
            <h4 class="customer-name">{{ review.name }} {{ review.surname }}</h4>
            <p class="customer-status">{{ review.status }}</p>
            <p class="customer-stats">
              {{ review.stats.trips }} trips &bull; Joined {{ review.stats.joined }}
            </p>
          </div>
        </div>
        <!-- separate component -->
        <div class="rate-card">
          <img src="assets/star-solid 4.svg" *ngFor="let item of settedRate" />
          <img src="assets/star-regular 1.svg" *ngFor="let item of rate" />
        </div>
        <!-- separate component -->
        <p class="review-card">{{ review.review }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./customer-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() review!: CustomerReview;
  rate!: number[];
  settedRate!: number[];

  ngOnInit(): void {
    this.rateRender(this.review.rate);
  }

  private rateRender(review: number): void {
    this.rate = Array(5)
      .fill(0)
      .map((x, i) => i);

    if (review) {
      this.settedRate = Array(review)
        .fill(0)
        .map((x, i) => i);
      this.rate = Array(5 - review)
        .fill(0)
        .map((x, i) => i);
    }
  }
}
