import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-guide-item',
    template: `
    <div class="wrapper">
      <div class="img-container">
        <img src="{{ graphic }}" *ngIf="graphic" data-test="image" />
      </div>
      <h3 data-test="title">{{ title }}</h3>
      <p data-test="content">{{ content }}</p>
    </div>
  `,
    styleUrls: ['./guide-item.component.scss'],
    standalone: false
})
export class GuideItemComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() graphic?: string;
}
