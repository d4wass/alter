import { Component, Input, OnInit } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-vehicle-form-features-data',
  template: `
    <form [formGroup]="formGroupCtrl">
      <h2>Features</h2>
      <form formGroupName="engine">
        <h4>Engine</h4>
        <mat-form-field appearance="fill" floatLabel="always">
          <mat-label>capacity</mat-label>
          <input
            matInput
            type="number"
            class="example-right-align"
            placeholder="0"
            formControlName="capacity"
          />
        </mat-form-field>
        <mat-form-field appearance="fill" floatLabel="always">
          <mat-label>power</mat-label>
          <input
            matInput
            type="number"
            class="example-right-align"
            placeholder="0"
            formControlName="power"
          />
        </mat-form-field>
      </form>
      <app-vehicle-feature-radio-input-form
        [formCtrl]="this.formGroupCtrl.get('gearbox')"
        [title]="'Gearbox'"
        [types]="this.gearboxTypes"
      ></app-vehicle-feature-radio-input-form>
      <app-vehicle-feature-radio-input-form
        [formCtrl]="this.formGroupCtrl.get('drive')"
        [title]="'Drive'"
        [types]="this.driveTypes"
      ></app-vehicle-feature-radio-input-form>
      <h4>Additional Equipment</h4>
      <app-vehicle-feature-checkbox-input-form
        [equipmentCtrl]="equipmentCtrl"
      ></app-vehicle-feature-checkbox-input-form>
    </form>
  `,
  styleUrls: ['./vehicle-form-features-data.component.scss']
})
export class VehicleFormFeaturesDataComponent implements OnInit {
  @Input() formGroupCtrl!: FormGroup<ControlsOf<any>>;
  driveCtrl!: FormGroup<ControlsOf<any>>;
  gearboxCtrl!: FormGroup<ControlsOf<any>>;
  equipmentCtrl!: FormGroup<ControlsOf<any>>;
  driveTypes = ['rear', 'all', 'front'];
  gearboxTypes = ['automatic', 'manual'];

  ngOnInit(): void {
    this.equipmentCtrl = this.formGroupCtrl.controls.equipment;
    this.driveCtrl = this.formGroupCtrl.controls.drive;
    this.gearboxCtrl = this.formGroupCtrl.controls.gearbox;
  }
}
