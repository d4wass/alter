import { Component } from '@angular/core';
import { urlList } from '../../../../router/routes';
import { NavigationItemComponent } from '@project/components/atoms/navigation-item/navigation-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, NavigationItemComponent],
  selector: 'app-navigation-bar',
  template: `
    <nav>
      <ul class="navigation-bar">
        <li *ngFor="let item of urlList">
          <app-navigation-item [item]="item"></app-navigation-item>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  urlList = urlList;
}
