import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import { VehiclesActions } from 'src/+state/vehicles/vehicle.actions';
import { VehicleSelectors } from 'src/+state/vehicles/vehicle.selectors';
import { SearchService } from 'src/project/services/search-service/search.service';

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
        <div class="input-data">
          <app-search-header-input
            typeValue="date"
            labelValue="Until"
            placeholderValue="ex: 11/03/21"
            [control]="searchForm.controls.fromDate"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="time"
            placeholderValue="10:00 am"
            [control]="searchForm.controls.fromHour"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data">
          <app-search-header-input
            typeValue="date"
            labelValue="From"
            placeholderValue="ex: 12/03/21"
            [control]="searchForm.controls.endDate"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="time"
            placeholderValue="11:00 am"
            [control]="searchForm.controls.endHour"
          ></app-search-header-input>
        </div>
      </form>
      <button (click)="onSubmit()">search</button>
    </div>
  `,
  styleUrls: ['./main-search-form.component.scss']
})
export class MainSearchFormComponent {
  constructor(private store: Store) {}

  searchForm = new FormGroup({
    place: new FormControl('', Validators.required),
    fromDate: new FormControl(''),
    fromHour: new FormControl(''),
    endDate: new FormControl(''),
    endHour: new FormControl('')
  });

  onSubmit(): void {
    const { place, fromDate, fromHour, endDate, endHour } = this.searchForm.controls;
    if (place.valid) {
      this.store.dispatch(VehiclesActions.loadVehicles());
      this.store.dispatch(VehiclesActions.searchVehicles({ query: place.value }));
    }
  }
}
