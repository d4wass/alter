import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';

@Component({
  selector: 'app-main-search-form',
  template: `
    <div class="wrapper">
      <form [formGroup]="searchForm" class="input-wrapper">
        <div>
          <app-search-header-input
            labelValue="Where"
            placeholderValue="City, airport, address or hotel"
            [control]="searchForm.controls.place"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data">
          <app-datepicker
            [control]="searchForm.controls.fromDate"
            [label]="'From'"
          ></app-datepicker>
        </div>
        <span></span>
        <div class="input-data">
          <app-datepicker
            [control]="searchForm.controls.endDate"
            [label]="'Until'"
          ></app-datepicker>
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
    fromDate: new FormControl(new Date().toISOString(), Validators.required),
    endDate: new FormControl(new Date().toISOString(), Validators.required)
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    const { place, fromDate, endDate } = this.searchForm.controls;

    if (place.valid && fromDate.valid && endDate.valid) {
      this.store.dispatch(VehiclesActions.loadVehicles());
      this.store.dispatch(
        VehiclesActions.searchVehicles({
          query: {
            place: place.value,
            fromDate: this.dataConverter(fromDate.value).date,
            endDate: this.dataConverter(endDate.value).date
          }
        })
      );
    }
  }

  private dataConverter(date: string) {
    const convertedDate = new Date(date);
    const day = convertedDate.getDate();
    const month = convertedDate.getMonth() + 1;

    return {
      date: `${day}.${month < 10 ? `0${month}` : `${month}`}.${convertedDate.getFullYear()}`
    };
  }
}
