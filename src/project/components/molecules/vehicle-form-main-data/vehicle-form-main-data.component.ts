import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';
import { IVehicleBasicData } from 'src/project/model/vehicle-form-models/vehicle-forms.model';

@Component({
    selector: 'app-vehicle-form-main-data',
    template: `
    <form [formGroup]="formGroupCtrl">
      <h2>Vehicle Info</h2>
      <mat-form-field appearance="fill">
        <mat-label>Brand</mat-label>
        <input matInput formControlName="brand" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Model</mat-label>
        <input matInput formControlName="model" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Place</mat-label>
        <input matInput formControlName="place" />
      </mat-form-field>
      <mat-form-field appearance="fill" floatLabel="always">
        <mat-label>Price per day</mat-label>
        <input
          matInput
          type="number"
          class="example-right-align"
          placeholder="$"
          formControlName="price"
        />
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Vehicle Description</mat-label>
        <textarea
          matInput
          placeholder="describe your vehicle in few words"
          formControlName="description"
        ></textarea>
      </mat-form-field>
    </form>
  `,
    styleUrls: ['./vehicle-form-main-data.component.scss'],
    standalone: false
})
export class VehicleFormMainDataComponent {
  @Input() formGroupCtrl!: FormGroup<ControlsOf<IVehicleBasicData>>;
}
