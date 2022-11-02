import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';

@Component({
  selector: 'app-main-search-form',
  template: `
    <div class="wrapper">
      <form formGroup="[searchForm]" class="input-wrapper">
        <div>
          <app-search-header-input
            labelValue="Where"
            placeholderValue="City, airport, address or hotel"
            [control]="searchForm.controls.place"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data" formGroup="fromDate">
          <app-search-header-input
            typeValue="date"
            labelValue="Until"
            placeholderValue="ex: 11/03/21"
            [control]="searchForm.controls.fromDate.controls.date"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="time"
            placeholderValue="10:00 am"
            [control]="searchForm.controls.fromDate.controls.hour"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data" fromGroup="endDate">
          <app-search-header-input
            typeValue="date"
            labelValue="From"
            placeholderValue="ex: 12/03/21"
            [control]="searchForm.controls.endDate.controls.date"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="time"
            placeholderValue="11:00 am"
            [control]="searchForm.controls.endDate.controls.hour"
          ></app-search-header-input>
        </div>
        <button (click)="onSubmit($event)">search</button>
      </form>
    </div>
  `,
  styleUrls: ['./main-search-form.component.scss']
})
export class MainSearchFormComponent {
  constructor(private store: Store) {}

  searchForm = new FormGroup({
    place: new FormControl('', Validators.required),
    fromDate: new FormGroup({
      date: new FormControl('', Validators.required),
      hour: new FormControl('')
    }),
    endDate: new FormGroup({
      date: new FormControl('', Validators.required),
      hour: new FormControl('')
    })
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    const { place, fromDate, endDate } = this.searchForm.controls;

    if (place.valid && fromDate.controls.date.valid && endDate.controls.date.valid) {
      this.store.dispatch(VehiclesActions.loadVehicles());
      this.store.dispatch(
        VehiclesActions.searchVehicles({
          query: {
            place: place.value,
            fromDate: this.dataConverter(fromDate.value),
            endDate: this.dataConverter(endDate.value)
          }
        })
      );
    }
  }

  private dataConverter(value: { date: string; hour: string }) {
    const { date, hour } = value;
    const convertedDate = new Date(date);
    const day = convertedDate.getDate();
    const month = convertedDate.getMonth() + 1;
    return {
      date: `${day}.${month < 10 ? `0${month}` : `${month}`}.${convertedDate.getFullYear()}`,
      hour
    };
  }
}
