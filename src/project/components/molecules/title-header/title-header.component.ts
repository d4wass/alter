import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-title-header',
    template: `
    <div class="wrapper" [ngClass]="bgHeader">
      <div class="title-container">
        <h1 class="title">{{ title }}</h1>
        <ng-container *ngIf="isRouter">
          <app-main-search-form></app-main-search-form>
        </ng-container>
      </div>
    </div>
  `,
    styleUrls: ['./title-header.component.scss'],
    standalone: false
})
export class TitleHeaderComponent implements OnInit {
  @Input() title!: string;
  isRouter!: boolean;
  bgHeader!: string;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.isRouter = this._router.url === '/';
    this.setBgHeader();
  }

  private setBgHeader(): void {
    switch (this._router.url) {
      case '/':
        this.bgHeader = 'main';
        break;
      case '/faq':
        this.bgHeader = 'faq';
        break;
      case '/host':
        this.bgHeader = 'host';
        break;
      case '/new-user':
        this.bgHeader = 'user';
        break;
      default:
        break;
    }
  }
}
