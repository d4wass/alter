import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-faq-question',
    template: `
    <div class="faq-wrapper">
      <div class="faq-header">
        <app-faq-title [title]="questionItem.title" [titleNumber]="questionNumber"></app-faq-title>
        <app-faq-button (isOpenEvent)="handleContentOpen($event)"></app-faq-button>
      </div>
      <div class="faq-content" *ngIf="isContentOpen">
        {{ questionItem.content }}
      </div>
    </div>
  `,
    styleUrls: ['./faq-question.component.scss'],
    standalone: false
})
export class FaqQuestionComponent {
  @Input() questionItem!: { title: string; content: string };
  @Input() questionNumber!: number;
  isContentOpen: boolean = false;

  constructor() {}

  handleContentOpen(value: boolean) {
    this.isContentOpen = value;
  }
}
