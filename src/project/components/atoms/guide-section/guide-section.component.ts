import { Component } from '@angular/core';

const guidesItems = [
  {
    graphic: 'assets/host/graphic/car.svg',
    title: 'Getting started guide',
    content:
      'From getting to know the app to tweaking your settings to work for your schedule, get a comprehensive crash course in setting up and optimizing your listing.'
  },
  {
    graphic: 'assets/host/graphic/camera.svg',
    title: 'Photographic guide',
    content:
      'Better pics mean more clicks — see how to take strong shots of your car to make your car sparkle and stand out in search results.'
  },
  {
    graphic: 'assets/host/graphic/clean.svg',
    title: 'Cleaning & disnfection guide',
    content:
      'See how to clean and disinfect your car thoroughly and effectively to safeguard yourself and your guests, and comply with the Turo enhanced cleaning policy.'
  },
  {
    graphic: 'assets/host/graphic/contactless.svg',
    title: 'Contactless check-in guide',
    content:
      'Maintain physical distance and promote peace of mind with these tips and best practices on how to check in your guests remotely.'
  },
  {
    graphic: 'assets/host/graphic/protection.svg',
    title: 'How it works: Vehicle protection for Turo hosts',
    content:
      'Explore your protection plan options, get to know the terminology, get your questions answered, and pick the plan that’s best for you.'
  }
];

@Component({
  selector: 'app-guide-section',
  template: `
    <div class="wrapper">
      <h1>Guides to help you learn & earn</h1>
      <div class="guides-container">
        <app-guide-item
          *ngFor="let item of guidesItems"
          [title]="item.title"
          [content]="item.content"
          [graphic]="item.graphic"
        ></app-guide-item>
      </div>
    </div>
  `,
  styleUrls: ['./guide-section.component.scss']
})
export class GuideSectionComponent {
  guidesItems = guidesItems;
}
