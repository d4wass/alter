import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@ngneat/reactive-forms';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
  tap
} from 'rxjs';
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
  updatedUser: UserDataToUpdate = {
    emailUpdate: '',
    descriptionUpdate: '',
    mobileUpdate: {
      newValue: '',
      oldValue: '',
      confirmValue: ''
    },
    passwordUpdate: {
      newValue: '',
      oldValue: '',
      confirmValue: ''
    }
  };
  descriptionCtrl = new FormControl('');

  private readonly unsubscribe$ = new Subject();

  constructor(
    private userFacade: UserFacade,
    private appSettingFacade: AppSettingFacade,
    private readonly store: Store,
    private readonly router: Router
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
        this.store.dispatch(UserActions.updateUserProfile({ updateUser: this.updatedUser, token }));
      });

    this.updatedUser = this.setUpdatedUserToInitialValue();
    this.profileBtn = 'Edit Profile';
  }

  userUpdate(event: Event) {
    this.updatedUser = { ...this.updatedUser, ...event };
  }

  userEmailUpdate(event: any) {
    this.updatedUser = { ...this.updatedUser, emailUpdate: event };
  }

  handleUserDescriptionField() {
    this.descriptionCtrl.valueChanges
      .pipe(
        filter((value: string) => value !== ''),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((value) => (this.updatedUser.descriptionUpdate = value));
  }

  onCancelClick(): void {
    this.store.dispatch(AppActions.closeEditProfileUser({ isProfile: false }));
    this.profileBtn = 'Edit Profile';
  }

  onLogoutClick(): void {
    this.store.dispatch(UserActions.logoutUser());
  }

  handleAddVehicle() {
    this.router.navigateByUrl('/addVehicle');
  }

  private lastnameShortened(): Observable<string | undefined> {
    return this.userFacade.userLastName$.pipe(map((x) => x?.substring(0, 1)));
  }

  private setUpdatedUserToInitialValue(): UserDataToUpdate {
    const initUpdatedUser = {
      emailUpdate: '',
      descriptionUpdate: '',
      mobileUpdate: {
        newValue: '',
        oldValue: '',
        confirmValue: ''
      },
      passwordUpdate: {
        newValue: '',
        oldValue: '',
        confirmValue: ''
      }
    };
    return initUpdatedUser;
  }
}
