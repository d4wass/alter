import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <div>
      <a routerLink="/">
        <img src="assets/logo.svg" alt="logo" class="logo" />
      </a>
      <app-navigation-bar></app-navigation-bar>
      <p>log in</p>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor() {}
}
