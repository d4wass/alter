import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { urlItem } from 'src/router/routes';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
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
