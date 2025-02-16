import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <div class="wrapper">
      <div class="content">
        <div class="wrapper-nav">
          <app-footer-menu
            *ngFor="let item of footerMenus"
            [menuItems]="item.items"
            [menuTitle]="item.title"
          ></app-footer-menu>
        </div>
        <div class="wrapper-social">
          <div class="social-links">
            <a href="#">
              <img src="assets/footer/facebook-footer.svg" alt="" />
            </a>
            <a href="#">
              <img src="assets/footer/youtube-footer.svg" alt="" />
            </a>
            <a href="#">
              <img src="assets/footer/instagram-footer.svg" alt="" />
            </a>
            <a href="#">
              <img src="assets/footer/twitter-footer.svg" alt="" />
            </a>
          </div>
          <div class="apps-links">
            <a href="#">
              <img src="assets/footer/app-store.svg" alt="" />
            </a>
            <a href="#">
              <img src="assets/footer/google-play.svg" alt="" />
            </a>
          </div>
          <div class="language-selector">
            <app-language-select></app-language-select>
          </div>
        </div>
      </div>
    </div>
    <div class="under-footer">
      <a href="#">Alter</a>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Sitemap</a>
    </div>
  `,
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent {
  footerMenus = [
    {
      title: 'Alter',
      items: [
        { name: 'About', route: 'about' },
        { name: 'Team', route: 'team' },
        { name: 'Policies', route: 'policies' },
        { name: 'Carrers', route: 'carrers' },
        { name: 'Press', route: 'press' },
        { name: 'Alter shop', route: 'shop' }
      ]
    },
    {
      title: 'Location',
      items: [
        { name: 'Poland', route: 'poland' },
        { name: 'Germany', route: 'germany' },
        { name: 'England', route: 'england' },
        { name: 'France', route: 'france' }
      ]
    },
    {
      title: 'Explore',
      items: [
        { name: 'Book a car', route: 'booking' },
        { name: 'Weddings', route: 'weddings' },
        { name: 'FAQ', route: 'faq' },
        { name: 'Trust & safety', route: 'policies' },
        { name: 'Help', route: 'help' }
      ]
    },
    {
      title: 'Hosting',
      items: [
        { name: 'Rent your car', route: 'rentals' },
        { name: 'Become a host', route: 'host' },
        { name: 'Host Tools', route: 'host-tools' },
        { name: 'Insurance & protection', route: 'insurance' }
      ]
    }
  ];
  constructor() {}
}
