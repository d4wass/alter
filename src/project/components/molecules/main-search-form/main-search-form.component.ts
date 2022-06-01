import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { SearchService } from 'src/project/services/search-service/search.service';

@Component({
  selector: 'app-main-search-form',
  template: `
    <div class="wrapper">
      <form formGroup="[searchForm]" class="input-wrapper">
        <div>
          <app-search-header-input
            typeValue="text"
            labelValue="Where"
            placeholderValue="City, airport, address or hotel"
            [control]="searchForm.controls.place"
          ></app-search-header-input>
        </div>
        <span></span>
        <div class="input-data">
          <app-search-header-input
            typeValue="data"
            labelValue="Until"
            placeholderValue="ex: 11/03/21"
            [control]="searchForm.controls.fromDate"
          ></app-search-header-input>
          <app-search-header-input
            typeValue="data"
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
            typeValue="date"
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
  constructor(private searchService: SearchService) {}

  searchForm = new FormGroup({
    place: new FormControl('', Validators.required),
    fromDate: new FormControl(''),
    fromHour: new FormControl(''),
    endDate: new FormControl(''),
    endHour: new FormControl('')
  });

  onSubmit(): void {
    console.log(this.searchForm.controls);
    const { place, fromDate, fromHour, endDate, endHour } = this.searchForm.controls;
    if (this.searchForm.valid) {
      this.searchService.searchVehicles(
        place.value,
        fromDate.value,
        fromHour.value,
        endDate.value,
        endHour.value
      );
    }
  }
}
