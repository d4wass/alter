import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchedCarCardComponent } from '@project/components/molecules/searched-car-card/searched-car-card.component';
import { Observable } from 'rxjs';
import { VehicleFacade } from 'src/+state/facade/vehicle.facade';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Component({
  standalone: true,
  imports: [CommonModule, SearchedCarCardComponent],
  selector: 'app-searched-car-section',
  template: `
    <div class="wrapper">
      <ng-container *ngIf="isVehicleFound$ | async">
        <app-searched-car-card
          *ngFor="let vehicle of allVehicles$ | async; let i = index"
          [vehicle]="vehicle"
          [vehicleIndex]="i + 1"
        >
        </app-searched-car-card>
      </ng-container>
      <ng-container *ngIf="(isVehicleFound$ | async) === false">
        <h2>no result for search query</h2>
      </ng-container>
    </div>
  `,
  styleUrls: ['./searched-car-section.component.scss']
})
export class SearchedCarSectionComponent {
  constructor(private vehicleFacade: VehicleFacade) {}

  get isVehicleFound$(): Observable<boolean> {
    return this.vehicleFacade.getIsVehicleFound();
  }

  get allVehicles$(): Observable<Vehicle[]> {
    return this.vehicleFacade.allVehicles$;
  }
}
