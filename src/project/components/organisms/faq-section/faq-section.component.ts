import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  template: `
    <div class="wrapper">
      <div class="faq-content">
        <h1>Frequently asked questions</h1>
        <div class="faq-content-wrapper">
          <app-faq-question
            *ngFor="let item of questions; let i = index"
            [questionItem]="item"
            [questionNumber]="i"
          ></app-faq-question>
        </div>
      </div>
      <div class="faq-img-wrapper"></div>
    </div>
  `,
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent {
  questions = [
    {
      title: 'How’s Alter works?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: 'What do you need to book a car on Alter?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: 'What is the cancellarion policy on Alter?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      title: 'Can I get my car delivered to me?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  constructor() {}
}
