import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view.component';
import { ProfileBtnComponent } from 'src/project/components/atoms/profile-btn/profile-btn.component';

@NgModule({
  declarations: [ProfileViewComponent, ProfileBtnComponent],
  imports: [CommonModule]
})
export class ProfileViewModule {}
