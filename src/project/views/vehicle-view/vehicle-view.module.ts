import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleViewComponent } from './vehicle-view.component';
import { DatepickerModule } from 'src/project/components/molecules/datepicker/datepicker.module';

@NgModule({
  declarations: [VehicleViewComponent],
  imports: [CommonModule, DatepickerModule],
  exports: [VehicleViewComponent]
})
export class VehicleViewModule {}
