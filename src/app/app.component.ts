import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="container">
      <div class="grid">
        <app-navigation></app-navigation>
      </div>
      <div class="flex">
        <router-outlet></router-outlet>
      </div>
      <div class="grid">
        <p>footer</p>
      </div>
    </main>
    <app-login-modal></app-login-modal>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alter';
}
