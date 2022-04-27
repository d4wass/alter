import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guide-item',
  template: `
    <div class="wrapper">
      <div class="img-container">
        <img src="{{ graphic }}" *ngIf="graphic" />
      </div>
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  `,
  styleUrls: ['./guide-item.component.scss']
})
export class GuideItemComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() graphic?: string;
}
