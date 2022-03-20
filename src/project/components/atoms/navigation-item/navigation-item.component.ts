import { Component, Input } from '@angular/core';
import { urlItem } from 'src/utils/routes';

@Component({
  selector: 'app-navigation-item',
  template: `
    <a [routerLink]="['/', item?.url]" routerLinkActive="router-link-active">{{
      item?.description
    }}</a>
  `,
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @Input() item?: urlItem;
}
