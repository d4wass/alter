import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view.component';
import { EditAccoutnFormModule } from 'src/project/components/organisms/account-edit-form/account-edit-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationUserListComponent } from 'src/project/components/molecules/reservation-user-list/reservation-user-list.component';
import { VehicleUserListComponent } from 'src/project/components/molecules/vehicle-user-list/vehicle-user-list.component';
import { ProfileBtnModule } from 'src/project/components/atoms/profile-btn/profile-btn.module';

@NgModule({
  declarations: [ProfileViewComponent, ReservationUserListComponent, VehicleUserListComponent],
  imports: [CommonModule, EditAccoutnFormModule, ReactiveFormsModule, ProfileBtnModule]
})
export class ProfileViewModule {}
