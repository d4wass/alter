import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFeatureRadioInputFormComponent } from './vehicle-feature-radio-input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [VehicleFeatureRadioInputFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [VehicleFeatureRadioInputFormComponent]
})
export class VehicleFeatureRadioInputFormModule {}
