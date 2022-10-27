import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view.component';
import { ProfileBtnComponent } from 'src/project/components/atoms/profile-btn/profile-btn.component';
import { EditAccoutnFormModule } from 'src/project/components/organisms/account-edit-form/account-edit-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileViewComponent, ProfileBtnComponent],
  imports: [CommonModule, EditAccoutnFormModule, ReactiveFormsModule]
})
export class ProfileViewModule {}
