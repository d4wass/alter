import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleEquipmentItemComponent } from './vehicle-equipment-item.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VehicleEquipmentItemComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
  exports: [VehicleEquipmentItemComponent]
})
export class VehicleEquipmentItemModule {}
