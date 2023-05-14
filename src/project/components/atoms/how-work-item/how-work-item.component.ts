import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-how-work-item',
  template: `
    <div class="wrapper">
      <div class="indicator">
        <p *ngIf="itemNumber" data-test="indicator">{{ itemNumber }}</p>
      </div>
      <div class="content">
        <h2>{{ itemTitle }}</h2>
        <p>{{ itemContent }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./how-work-item.component.scss']
})
export class HowWorkItemComponent {
  @Input() itemNumber?: string;
  @Input() itemTitle!: string;
  @Input() itemContent!: string;
}
