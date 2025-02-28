import { Component } from '@angular/core';

const benefitItems = [
  {
    title: 'Physical damage protection',
    content:
      'Choose from three protection plans — Premier, Standard, or Minimum — to get the level of coverage that’s right for you. Spring for Premier for peace of mind, or pay less for lighter coverage with higher out-of-pocket costs for vehicle damage or theft'
  },
  {
    title: 'Liability insurance included',
    content:
      'All protection plans include coverage under a third-party liability insurance policy issued to Turo from Travelers Excess and Surplus Lines Company — $750,000 for the Premier plan'
  },
  {
    title: '24/7 support & roadside assistance',
    content:
      'Customer support is available online 24/7 to answer your questions, and 24/7 roadside assistance is just a call away to keep you safe and on the road.'
  }
];

@Component({
  selector: 'app-benefit-section',
  template: `
    <div class="wrapper">
      <div class="graphic-content">
        <div class="svg-1"></div>
        <div class="img"></div>
        <div class="svg-2"></div>
      </div>
      <h1>You're covered</h1>
      <div class="benefit-container">
        <app-how-work-item
          *ngFor="let item of benefitItems"
          [itemTitle]="item.title"
          [itemContent]="item.content"
        ></app-how-work-item>
      </div>
    </div>
  `,
  styleUrls: ['./benefit-section.component.scss']
})
export class BenefitSectionComponent {
  benefitItems = benefitItems;
  constructor() {}
}
