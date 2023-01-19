import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';
import { ReservationActions } from 'src/+state/reservation/reservation.actions';

@Component({
  selector: 'app-reservation-user-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>host</th>
          <th>vehicle</th>
          <th>start</th>
          <th>end</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of populatedReservations$ | async">
          <td>{{ item.host.firstName }} {{ item.host.lastName }}</td>
          <td>{{ item.vehicle.brand }} {{ item.vehicle.model }}</td>
          <td>{{ item.fromDate }}</td>
          <td>{{ item.endDate }}</td>
          <td><button>confirm</button><button>cancel</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./reservation-user-list.component.scss']
})
@UntilDestroy()
export class ReservationUserListComponent implements OnInit, AfterViewInit {
  @Input() reservations!: any[];
  populatedReservations$: Observable<any[]> = of([]);

  constructor(private readonly store: Store, private readonly userFacade: UserFacade) {}
  ngAfterViewInit(): void {
    this.getPopulatedReservations();
  }

  ngOnInit(): void {
    this.populateReservations();
  }

  private populateReservations(): void {
    this.store.dispatch(
      ReservationActions.populateUserReservations({ reservations: this.reservations })
    );
  }

  private getPopulatedReservations(): void {
    this.populatedReservations$ = this.userFacade.userPopulatedReservations$.pipe(
      tap((x) => console.log(x)),
      debounceTime(500),
      untilDestroyed(this)
    );
  }
}
