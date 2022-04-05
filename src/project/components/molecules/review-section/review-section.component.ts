import { Component } from '@angular/core';
import { CustomerReview } from '../customer-card/customer-card.component';

const reviews = [
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 10, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 3
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 20, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 4
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 30, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 5
  },
  {
    img: 'assets/reviewUser.png',
    name: 'Name',
    surname: 'Surname',
    status: 'All-star Host',
    stats: { trips: 40, joined: 'Jan 2016' },
    review:
      'Ran well. Very convenient check in and check out. I was using it to move some small pelican cases, so loading into th...',
    rate: 2
  }
];

@Component({
  selector: 'app-review-section',
  template: `
    <div class="review-section">
      <h1>Alter Customers</h1>
      <div class="reviews-wrapper">
        <img src="assets/angle-left.svg" />
        <div class="reviews">
          <app-review-card *ngFor="let review of reviews" [review]="review"></app-review-card>
        </div>
        <img src="assets/angle-right.svg" />
      </div>
    </div>
  `,
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent {
  reviews: CustomerReview[] = reviews;
  constructor() {}
}
