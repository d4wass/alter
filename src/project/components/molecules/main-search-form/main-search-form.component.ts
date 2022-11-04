import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
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
            [control]="searchForm.controls.fromDate.controls.date"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="time"
            [control]="searchForm.controls.fromDate.controls.hour"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data" fromGroup="endDate">
          <!-- <app-datepicker [control]="searchForm.controls.endDate.controls.date"></app-datepicker> -->
          <app-search-header-input
            typeValue="time"
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
  private currentDate = this.dataConverter({
    date: formatDate(new Date(), 'dd-MM-YYYY', 'en'),
    hour: ''
  }).date;

  constructor(private store: Store) {}

  searchForm = new FormGroup({
    place: new FormControl('', Validators.required),
    fromDate: new FormGroup({
      date: new FormControl(this.currentDate, Validators.required),
      hour: new FormControl('')
    }),
    endDate: new FormGroup({
      date: new FormControl(this.currentDate, Validators.required),
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
