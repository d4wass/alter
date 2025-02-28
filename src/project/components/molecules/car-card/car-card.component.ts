import { Component, Input } from '@angular/core';

interface CarCard {
  title: string;
  img: string;
}

@Component({
  selector: 'app-car-card',
  template: `
    <div class="car-card">
      <img class="car-card-img" src="{{ carCard.img }}" alt="" />
      <div class="car-card-title">
        <h3>{{ carCard.title }}</h3>
      </div>
    </div>
  `,
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input() carCard!: CarCard;
}
