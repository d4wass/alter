import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';
import { AppActions } from 'src/+state/app-state/app-state.actions';
import { AppSettingFacade } from 'src/+state/facade/app-settings.facade';
import { UserFacade } from 'src/+state/facade/user.facade';
import { UserDataToUpdate } from 'src/+state/models/user.model';
import { UserActions } from 'src/+state/user/user.actions';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  userName$!: Observable<string | undefined>;
  userLastName$!: Observable<string | undefined>;
  userEmail$!: Observable<string | undefined>;
  isEditView$!: Observable<boolean>;
  token$!: Observable<string>;
  profileBtn: string = 'Edit Profile';
  updatedUser: UserDataToUpdate | undefined;

  private readonly unsubscribe$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private appSettingFacade: AppSettingFacade,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.userEmail$ = this.userFacade.userEmail$;
    this.userName$ = this.userFacade.userName$;
    this.userLastName$ = this.lastnameShortened();
    this.isEditView$ = this.appSettingFacade.isEditProfile$;
    this.token$ = this.userFacade.userToken$;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

  onEditClick(): void {
    this.store.dispatch(AppActions.openEditProfileUser({ isProfile: true }));
    this.profileBtn = 'Save Profile';
  }

  onSaveClick(): void {
    this.token$
      .pipe(
        map((token) => token),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((token) => {
        this.store.dispatch(AppActions.closeEditProfileUser({ isProfile: false }));
        this.store.dispatch(UserActions.updateUserProfile({ user: this.updatedUser, token }));
      });

    this.profileBtn = 'Edit Profile';
  }

  userUpdate(event: Event) {
    this.updatedUser = { ...this.updatedUser, ...event };
  }

  userEmailUpdate(event: any) {
    this.updatedUser = { ...this.updatedUser, emailUpdate: event };
  }

  onCancelClick(): void {
    this.store.dispatch(AppActions.closeEditProfileUser({ isProfile: false }));
    this.profileBtn = 'Edit Profile';
  }

  onLogoutClick(): void {
    this.store.dispatch(UserActions.logoutUser());
  }

  private lastnameShortened(): Observable<string | undefined> {
    return this.userFacade.userLastName$.pipe(map((x) => x?.substring(0, 1)));
  }
}
