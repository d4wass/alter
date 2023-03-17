import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';
import { Vehicle } from 'src/+state/models/vehicle.model';

@Component({
  selector: 'app-vehicle-user-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>brand</th>
          <th>model</th>
          <th>price</th>
          <th>end</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of populatedVehicle$ | async">
          <td>{{ item.brand }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.place }}</td>
          <td><button (click)="handleRemove(item._id)">remove vehicle</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./vehicle-user-list.component.scss']
})
export class VehicleUserListComponent implements OnInit {
  @Output() removeEmitter: EventEmitter<string> = new EventEmitter<string>();
  populatedVehicle$!: Observable<Vehicle[]>;

  constructor(private readonly userFacade: UserFacade) {}

  ngOnInit(): void {
    this.populatedVehicle$ = this.createVehicleArrayFromEntity();
  }

  handleRemove(id: string) {
    this.removeEmitter.emit(id);
  }

  private createVehicleArrayFromEntity(): Observable<Vehicle[]> {
    return this.userFacade.userVehicles$.pipe(
      map((x) => {
        let arr: Vehicle[] = [];
        for (const [, value] of Object.entries(x)) {
          arr.push(value as Vehicle);
        }
        return arr;
      })
    );
  }
}
