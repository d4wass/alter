import { Component, Input } from '@angular/core';

export interface CtaBtn {
  content: string;
  route: string;
}

@Component({
    selector: 'app-resource-item',
    template: `
    <div class="wrapper">
      <img src="{{ icon }}" />
      <div class="content">
        <h2>{{ title }}</h2>
        <h5 *ngIf="subtitle" data-test="subtitle">{{ subtitle }}</h5>
        <p>{{ content }}</p>
      </div>
      <a routerLink="#">{{ cta?.content }}</a>
    </div>
  `,
    styleUrls: ['./resource-item.component.scss'],
    standalone: false
})
export class ResourceItemComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() cta?: CtaBtn;
  @Input() icon!: string;
}
