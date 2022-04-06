import { Component } from '@angular/core';

const carCards = [
  { title: 'BMW', img: 'assets/car.png' },
  { title: 'Toyota', img: 'assets/car.png' },
  { title: 'Mazda', img: 'assets/car.png' },
  { title: 'Jeep', img: 'assets/car.png' },
  { title: 'Mercedes-Benz', img: 'assets/car.png' }
];

@Component({
  selector: 'app-carousel-section',
  template: `
    <div class="carousel-section">
      <h1>Browse by make</h1>
      <div class="carousel-content">
        <img src="assets/angle-left.svg" />
        <div class="car-card-wrapper">
          <app-car-card *ngFor="let item of carCards" [carCard]="item"></app-car-card>
        </div>
        <img src="assets/angle-right.svg" />
      </div>
    </div>
  `,
  styleUrls: ['./carousel-section.component.scss']
})
export class CarouselSectionComponent {
  carCards = carCards;
  constructor() {}
}
