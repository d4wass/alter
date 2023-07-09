import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { debounceTime, map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user/user.facade';
import { Reservation } from 'src/+state/models/reservation.model';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';

@Component({
  selector: 'app-reservation-user-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>user</th>
          <th>host</th>
          <th>vehicle</th>
          <th>start</th>
          <th>end</th>
          <th>cost</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of populatedReservations$ | async">
          <td>{{ item.user.firstName }} {{ item.user.lastName }}</td>
          <td>{{ item.host.firstName }} {{ item.host.lastName }}</td>
          <td>{{ item.vehicle.brand }} {{ item.vehicle.model }}</td>
          <td>{{ item.fromDate }}</td>
          <td>{{ item.endDate }}</td>
          <td>{{ item.cost }}$</td>
          <td><button>confirm</button><button>cancel</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./reservation-user-list.component.scss']
})
@UntilDestroy()
export class ReservationUserListComponent implements OnInit {
  populatedReservations$!: Observable<Reservation[]>;

  constructor(private readonly store: Store, private readonly userFacade: UserFacade) {}
  // ngAfterViewInit(): void {

  // }
  // ngAfterViewInit(): void {

  // }

  ngOnInit(): void {
    this.populatedReservations$ = this.createReservationsArrayFromEntity();
    this.populatedReservations$ = this.createReservationsArrayFromEntity();
  }

  private createReservationsArrayFromEntity(): Observable<Reservation[]> {
    return this.userFacade.userReservations$.pipe(
      map((x) => {
        console.log(x);
        let arr: Reservation[] = [];
        for (const [, value] of Object.entries(x)) {
          arr.push(value as Reservation);
        }
        return arr;
      })
    );
  }
}
