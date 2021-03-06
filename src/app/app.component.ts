import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="grid">
      <app-navigation></app-navigation>
    </div>
    <router-outlet></router-outlet>
    <div class="grid">
      <app-footer></app-footer>
    </div>
    <app-login-modal></app-login-modal>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alter';
}
