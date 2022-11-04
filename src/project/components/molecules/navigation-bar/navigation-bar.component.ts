import { Component } from '@angular/core';
import { urlList } from '../../../../router/routes';

@Component({
  selector: 'app-navigation-bar',
  template: `
    <nav>
      <ul>
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
