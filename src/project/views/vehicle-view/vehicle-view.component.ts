import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { UserFacade } from 'src/+state/facade/user.facade';
import { Vehicle } from 'src/+state/models/vehicle.model';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleViewComponent implements OnInit {
  vehicle?: Vehicle;
  isAuthorized$!: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.userFacade.isUserAuthorized();
    this.vehicle = this.route.snapshot.data['vehicle'];
  }

  bookVehicle() {
    //filter this dispatch and execute it only if user is authorized
    const reservation = {
      vehicleId: '',
      userId: '',
      hostId: '',
      fromDate: '',
      endDate: ''
    };
    this.store.dispatch(VehiclesActions.vehicleReservation({ reservation }));
  }
}
