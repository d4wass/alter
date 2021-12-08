import { Component } from '@angular/core';

@Component({
  selector: 'app-home-navigation-template',
  template: `
    <ng-container>
      <app-navigation-bar></app-navigation-bar>
    </ng-container>
  `,
  styleUrls: ['./home-navigation-template.component.scss']
})
export class HomeNavigationTemplateComponent {}
