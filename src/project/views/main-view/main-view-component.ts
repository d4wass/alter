import { Component } from '@angular/core';

@Component({
  selector: 'app-main-view-component',
  template: `
    <h1>main template view</h1>
    <app-home-navigation></app-home-navigation>
  `,
  styleUrls: ['./main-view-component.scss']
})
export class MainViewComponent {
  constructor() {}
}
