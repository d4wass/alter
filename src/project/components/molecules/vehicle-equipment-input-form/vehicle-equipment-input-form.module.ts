import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleEquipmentInputFormComponent } from './vehicle-equipment-input-form.component';
import { VehicleEquipmentItemModule } from '../../atoms/vehicle-equipment-item/vehicle-equipment-item.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [VehicleEquipmentInputFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    VehicleEquipmentItemModule
  ],
  exports: [VehicleEquipmentInputFormComponent]
})
export class VehicleEquipmentInputFormModule {}
