import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VehicleFeatureCheckboxInputFormComponent } from './vehicle-feature-checkbox-input-form.component';

@NgModule({
  declarations: [VehicleFeatureCheckboxInputFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [VehicleFeatureCheckboxInputFormComponent]
})
export class VehicleFeatureCheckboxInputFormModule {}
