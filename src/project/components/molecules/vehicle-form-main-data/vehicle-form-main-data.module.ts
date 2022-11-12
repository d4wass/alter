import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormMainDataComponent } from './vehicle-form-main-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [VehicleFormMainDataComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  exports: [VehicleFormMainDataComponent]
})
export class VehicleFormMainDataModule {}
