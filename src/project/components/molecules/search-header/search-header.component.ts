import { Component } from '@angular/core';

@Component({
  selector: 'app-search-header',
  template: `
    <div class="wrapper">
      <div class="search-container">
        <h1 class="title">Find your drive</h1>
        <div class="input-wrapper">
          <div>
            <app-search-header-input
              typeValue="text"
              labelValue="Where"
              placeholderValue="City, airport, address or hotel"
            ></app-search-header-input>
          </div>
          <span></span>
          <div class="input-data">
            <app-search-header-input
              typeValue="data"
              labelValue="Until"
              placeholderValue="ex: 11/03/21"
            ></app-search-header-input>
            <app-search-header-input
              typeValue="data"
              placeholderValue="10:00 am"
            ></app-search-header-input>
          </div>
          <span></span>
          <div class="input-data">
            <app-search-header-input
              typeValue="date"
              labelValue="From"
              placeholderValue="ex: 12/03/21"
            ></app-search-header-input>
            <app-search-header-input
              typeValue="date"
              placeholderValue="11:00 am"
            ></app-search-header-input>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent {
  constructor() {}
}
