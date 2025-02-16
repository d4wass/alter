import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormMainDataComponent } from './vehicle-form-main-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VehicleFormMainDataComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  exports: [VehicleFormMainDataComponent]
})
export class VehicleFormMainDataModule {}
