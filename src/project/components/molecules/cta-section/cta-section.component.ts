import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  template: `
    <div class="wrapper">
      <div class="span-container">
        <span class="first"></span>
        <span class="second"></span>
      </div>
      <div class="content">
        <h2>Endless options</h2>
        <h3>Browse the world's largest car sharing marketplace</h3>
        <p>
          Whether it’s an SUV for a family road trip, a pickup truck for some errands, or a classic
          sports car for a special night out, find the perfect car for all kinds of occasions and
          budgets on Turo.
        </p>
        <button>Book the perfect car</button>
      </div>
    </div>
  `,
  styleUrls: ['./cta-section.component.scss']
})
export class CtaSectionComponent {
  constructor() {}
}
