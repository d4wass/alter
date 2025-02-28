import { Component } from '@angular/core';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';

@Component({
  selector: 'app-searched-car-section',
  template: `
    <div class="wrapper">
      <ng-container *ngIf="vehicleFacade.getIsVehicleFound() | async">
        <app-searched-car-card
          *ngFor="let vehicle of vehicleFacade.allVehicles$ | async; let i = index"
          [vehicle]="vehicle"
          [vehicleIndex]="i + 1"
        >
        </app-searched-car-card>
      </ng-container>
      <ng-container *ngIf="(vehicleFacade.getIsVehicleFound() | async) === false">
        <h2>no result for search query</h2>
      </ng-container>
    </div>
  `,
  styleUrls: ['./searched-car-section.component.scss']
})
export class SearchedCarSectionComponent {
  constructor(public vehicleFacade: VehicleFacade) {}
}
