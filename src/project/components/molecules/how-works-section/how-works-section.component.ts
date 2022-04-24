import { Component, OnInit } from '@angular/core';

type WorkItems = {
  itemNumber: string;
  title: string;
  content: string;
};

const worksItems = [
  {
    itemNumber: '1',
    title: 'Find perfect car',
    content: 'Enter a location and date and browse thousands of cars shared by local hosts.'
  },
  {
    itemNumber: '2',
    title: 'Book your trip',
    content:
      'Book on the Turo app or online, choose a protection plan, and say hi to your host! Cancel for free up to 24 hours before your trip.'
  },
  {
    itemNumber: '3',
    title: 'Hit the road',
    content:
      'Have the car delivered or pick it up from your host. Check in with the app, grab the keys, and hit the road!'
  }
];

@Component({
  selector: 'app-how-works-section',
  template: `
    <div class="wrapper">
      <h2>Reservation Steps:</h2>
      <div class="content">
        <div class="img-wrapper"></div>
        <div class="works-container">
          <app-how-work-item
            *ngFor="let item of worksItems"
            [itemTitle]="item.title"
            [itemContent]="item.content"
            [itemNumber]="item.itemNumber"
          ></app-how-work-item>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./how-works-section.component.scss']
})
export class HowWorksSectionComponent {
  worksItems: WorkItems[] = worksItems;
}
