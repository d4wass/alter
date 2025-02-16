import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-footer-menu',
    template: `
    <div class="wrapper">
      <h3>{{ menuTitle }}</h3>
      <ul>
        <li *ngFor="let item of menuItems">
          <a href="#">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  `,
    styleUrls: ['./footer-menu.component.scss'],
    standalone: false
})
export class FooterMenuComponent {
  @Input() menuTitle!: string;
  @Input() menuItems!: { name: string; route: string }[];
  constructor() {}
}
