import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <ng-container>
      <p>logo</p>
      <app-navigation-bar></app-navigation-bar>
      <p>log in</p>
    </ng-container>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor() {}
}
