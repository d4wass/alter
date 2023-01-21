import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileBtnComponent } from 'src/project/components/atoms/profile-btn/profile-btn.component';
import { ProfileBtnModule } from 'src/project/components/atoms/profile-btn/profile-btn.module';
import { ReservationVehicleViewComponent } from './reservation-vehicle-view.component';

@NgModule({
  declarations: [ReservationVehicleViewComponent],
  imports: [CommonModule, ProfileBtnModule],
  exports: [ReservationVehicleViewComponent]
})
export class ReservationConfirmViewModule {}
