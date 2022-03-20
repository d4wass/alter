import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="container">
      <div class="grid">
        <app-navigation></app-navigation>
      </div>
      <div class="grid">
        <router-outlet></router-outlet>
      </div>
      <div class="grid">
        <p>footer</p>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alter';
}
