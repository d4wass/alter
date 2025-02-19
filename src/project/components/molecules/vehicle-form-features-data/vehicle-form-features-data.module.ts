import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFeatureRadioInputFormModule } from '../../atoms/vehicle-feature-radio-input-form/vehicle-feature-radio-input-form.module';
import { VehicleEquipmentInputFormModule } from '../vehicle-equipment-input-form/vehicle-equipment-input-form.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VehicleFormFeaturesDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    VehicleEquipmentInputFormModule,
    VehicleFeatureRadioInputFormModule
  ],
  exports: [VehicleFormFeaturesDataComponent]
})
export class VehicleFormFeaturesDataModule {}
