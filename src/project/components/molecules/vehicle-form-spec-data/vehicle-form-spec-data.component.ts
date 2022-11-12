import { Component, Input, OnInit } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';
import { IVehicleSpecificationData } from 'src/project/model/vehicle-form-models/vehicle-forms.model';

@Component({
  selector: 'app-vehicle-form-spec-data',
  template: `
    <form [formGroup]="formGroupCtrl" class="wrapper">
      <h2>Specification</h2>
      <mat-form-field>
        <mat-label>Fuel Type</mat-label>
        <mat-select formControlName="fuelType">
          <mat-option value="Diesel">Diesel</mat-option>
          <mat-option value="Gas">Gas</mat-option>
          <mat-option value="Electric">Electric</mat-option>
          <mat-option value="Gas/LPG">Gas/LPG</mat-option>
        </mat-select>
      </mat-form-field>
      <form [formGroup]="fuelConsumptionGroupCtrl" class="fuelTypeForm">
        <mat-form-field>
          <mat-label>Units</mat-label>
          <mat-select formControlName="units" (valueChange)="handleChange($event)">
            <mat-option value="l/100km">l/100km</mat-option>
            <mat-option value="galons">galons</mat-option>
            <mat-option value="kW/100km">kW/100km</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Quantity</mat-label>
          <input matInput type="number" placeholder="Ex. 12" min="10" formControlName="quantity" />
        </mat-form-field>
      </form>
      <mat-form-field appearance="fill" floatLabel="always">
        <mat-label>Doors</mat-label>
        <input
          matInput
          type="number"
          class="example-right-align"
          placeholder="0"
          formControlName="doors"
        />
      </mat-form-field>
      <mat-form-field appearance="fill" floatLabel="always">
        <mat-label>Seats</mat-label>
        <input
          matInput
          type="number"
          class="example-right-align"
          placeholder="0"
          formControlName="seats"
        />
      </mat-form-field>
      <mat-checkbox class="example-margin">Is cancelation of reservation is free?</mat-checkbox>
    </form>
  `,
  styleUrls: ['./vehicle-form-spec-data.component.scss']
})
export class VehicleFormSpecDataComponent implements OnInit {
  @Input() formGroupCtrl!: FormGroup<ControlsOf<IVehicleSpecificationData>>;
  fuelConsumptionGroupCtrl: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.formGroupCtrl);
    const { fuelConsumption } = this.formGroupCtrl.controls;
    this.fuelConsumptionGroupCtrl = fuelConsumption;
  }

  handleChange($event: any) {
    console.log($event);
    console.log(this.fuelConsumptionGroupCtrl);
  }
}
