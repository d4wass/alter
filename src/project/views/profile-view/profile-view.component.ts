import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  userName$!: Observable<string | undefined>;
  userLastName$!: Observable<string | undefined>;
  userEmail$!: Observable<string | undefined>;
  profileBtn: string = 'Edit Profile';
  isEditView: boolean = false;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userEmail$ = this.userFacade.userEmail$;
    this.userName$ = this.userFacade.userName$;
    this.userLastName$ = this.lastnameShortened();
  }

  lastnameShortened(): Observable<string | undefined> {
    return this.userFacade.userLastName$.pipe(map((x) => x?.substring(0, 1)));
  }

  onLogoutClick() {
    console.log('logout');
  }

  onEditClick() {
    this.isEditView = !this.isEditView;
    if (this.isEditView) {
      this.profileBtn = 'Save Profile';
    }

    if (!this.isEditView) {
      this.profileBtn = 'Edit Profile';
    }
  }

  onCancelClick() {
    this.profileBtn = 'Edit Profile';
    this.isEditView = false;
  }
}
