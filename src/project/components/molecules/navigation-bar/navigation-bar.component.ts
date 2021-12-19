import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  template: `
    <nav>
      <ul>
        <li>Learn more</li>
        <li>How it's work</li>
        <li>Become a host</li>
        <li>Create Account</li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {}
