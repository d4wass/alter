import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Component({
  selector: 'app-searched-car-card',
  template: `
    <div class="wrapper">
      <div class="card-image"></div>
      <div class="card-content">
        <div class="card-info">
          <h3>{{ vehicle.model }}</h3>
          <p>{{ vehicle.rate }}</p>
        </div>
        <div class="card-price">
          <div class="card-price-spec-offer"></div>
          <div class="card-price-estimation">
            <p>{{ vehicle.price }}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./searched-car-card.component.scss']
})
export class SearchedCarCardComponent {
  @Input() vehicle!: Vehicle;
}
