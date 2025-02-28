import { Component } from '@angular/core';

const resourceItems = [
  {
    title: 'Deals & discounts',
    subtitle: 'Exclusive to Alter hosts',
    content:
      'Get access to exclusive deals, discounts, and programs to keep your Turo business well-oiled and in peak condition',
    cta: { route: '', content: 'Explore deals' },
    icon: 'assets/host/tool.svg'
  },
  {
    title: 'Stay connected',
    subtitle: 'Join Alter Talk',
    content:
      'Stay connected to the host community by joining Turo Talk, a Turo-moderated Facebook forum of top Turo hosts discussing all things Turo.',
    cta: { route: '', content: 'Join Alter Talks' },
    icon: 'assets/host/talk.svg'
  },
  {
    title: 'Alter incident info card',
    subtitle: '',
    content:
      "Download and print your incident information card, and then stash it in your glove box — you're required by law to keep both a personal insurance card and incident information card in your vehicle at all times.",
    cta: { route: '', content: 'Download incident info card' },
    icon: 'assets/host/inc-card.svg'
  }
];

@Component({
  selector: 'app-resource-section',
  template: `
    <div class="wrapper">
      <h1>Resources</h1>
      <div class="resources-container">
        <app-resource-item
          *ngFor="let item of resourceItems"
          [title]="item.title"
          [subtitle]="item.subtitle"
          [content]="item.content"
          [cta]="item.cta"
          [icon]="item.icon"
        ></app-resource-item>
      </div>
      <div class="policy-container">
        <h3>Nondiscrimination policy & community guidelines</h3>
        <p>
          Turo is a marketplace built on trust and fueled by diversity and inclusion. Review the
          community guidelines and nondiscrimination policy for the full vision.
        </p>
        <div class="cta-container">
          <button class="cta-btn">Review policy</button>
          <button class="cta-btn">Review guidelines</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./resource-section.component.scss']
})
export class ResourceSectionComponent {
  resourceItems = resourceItems;
}
