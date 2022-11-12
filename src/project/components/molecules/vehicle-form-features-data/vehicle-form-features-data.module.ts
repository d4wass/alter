import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [VehicleFormFeaturesDataComponent],
  imports: [CommonModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule],
  exports: [VehicleFormFeaturesDataComponent]
})
export class VehicleFormFeaturesDataModule {}
