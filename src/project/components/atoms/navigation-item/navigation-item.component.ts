import { Component, Input } from '@angular/core';
import { urlItem } from 'src/router/routes';

@Component({
  selector: 'app-navigation-item',
  template: `
    <a
      [routerLink]="['/', item?.url]"
      routerLinkActive="active-link"
      data-test="link"
      class="link"
      >{{ item?.description }}</a
    >
  `,
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() item?: urlItem;
}
