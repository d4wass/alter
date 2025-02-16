import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-faq-title',
    template: `
    <div class="title-wrapper">
      <h2 class="title-number" data-test="titleNumber">0{{ titleNumber + 1 }}</h2>
      <h3 class="title-text">{{ title }}</h3>
    </div>
  `,
    styleUrls: ['./faq-title.component.scss'],
    standalone: false
})
export class FaqTitleComponent {
  @Input() title!: string;
  @Input() titleNumber!: number;
}
