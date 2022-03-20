import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <div>
      <p>logo</p>
      <app-navigation-bar></app-navigation-bar>
      <p>log in</p>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor() {}
}
