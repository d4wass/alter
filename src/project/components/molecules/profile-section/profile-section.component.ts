import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-section',
  template: `
    <div class="profile-section">
      <div class="profile-info-wrapper">
        <div class="profile-title">
          <h3>{{ userName$ | async }} {{ userLastName$ | async }}.</h3>
          <p>Joined Jul 2022</p>
        </div>
        <div class="profile-info">
          <div class="profile-info-item">
            <p>Approved to drive</p>
            <a href="#">Verify ID</a>
          </div>
          <div class="profile-info-item">
            <p>{{ userEmail$ | async }}</p>
            <a href="#">verified</a>
          </div>
        </div>
      </div>
      <div class="profile-reviews-wrapper">
        <h5>Review from hosts</h5>
        <div class="profile-review-item"></div>
      </div>
    </div>
  `,
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent {
  userName$!: Observable<string | undefined>;
  userLastName$!: Observable<string | undefined>;
  userEmail$!: Observable<string | undefined>;

  constructor() {}
}
