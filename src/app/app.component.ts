import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
    <p>footer</p>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alter';
}
