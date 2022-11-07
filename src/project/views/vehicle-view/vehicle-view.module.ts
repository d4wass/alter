import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleViewComponent } from './vehicle-view.component';

@NgModule({
  declarations: [VehicleViewComponent],
  imports: [CommonModule],
  exports: [VehicleViewComponent]
})
export class VehicleViewModule {}
