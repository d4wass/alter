import { Component, Input } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-vehicle-feature-checkbox-input-form',
  template: `
    <form [formGroup]="equipmentCtrl">
      <section class="example-section">
        <mat-checkbox formControlName="appleCarPlay" class="example-margin"
          >Apple Car Play</mat-checkbox
        >
        <mat-checkbox formControlName="androidAuto" class="example-margin"
          >Android Auto</mat-checkbox
        >
        <mat-checkbox formControlName="bluetooth" class="example-margin">Bluetooth</mat-checkbox>
        <mat-checkbox formControlName="usb" class="example-margin">USB</mat-checkbox>
        <mat-checkbox formControlName="headUpDisplay" class="example-margin"
          >headup display</mat-checkbox
        >
        <mat-checkbox formControlName="navigation" class="example-margin">navigation</mat-checkbox>
        <mat-checkbox formContolName="airConditioning" class="example-margin"
          >air conditioning</mat-checkbox
        >
        <mat-checkbox formControlName="keyLess" class="example-margin">keyless access</mat-checkbox>
        <mat-checkbox formControlName="isofix" class="example-margin">isofix</mat-checkbox>
        <section>
          <h5>Cruise Control</h5>
          <form formGroupName="cruiseControl">
            <mat-checkbox formControlName="standard" class="example-margin">standard</mat-checkbox>
            <mat-checkbox formControlName="active" class="example-margin">active</mat-checkbox>
            <mat-checkbox formControlName="adaptive" class="example-margin">adaptive</mat-checkbox>
            <mat-checkbox formControlName="autonomic" class="example-margin"
              >autonomic</mat-checkbox
            >
          </form>
        </section>
        <section>
          <h5>Lights</h5>
          <form formGroupName="lights">
            <mat-checkbox formControlName="led" class="example-margin">led</mat-checkbox>
            <mat-checkbox formControlName="xenon" class="example-margin">xenon</mat-checkbox>
            <mat-checkbox formControlName="biXenon" class="example-margin">bi-xenon</mat-checkbox>
            <mat-checkbox formControlName="laser" class="example-margin">laser</mat-checkbox>
          </form>
        </section>
        <section>
          <h5>Park assist</h5>
          <form formGroupName="parkingAssist">
            <mat-checkbox formControlName="camera" class="example-margin">camera</mat-checkbox>
            <mat-checkbox formControlName="camera360" class="example-margin"
              >camera 360</mat-checkbox
            >
            <mat-checkbox formControlName="autonomic" class="example-margin"
              >autonomic</mat-checkbox
            >
          </form>
        </section>
      </section>
    </form>
  `,
  styleUrls: ['./vehicle-feature-checkbox-input-form.component.scss']
})
export class VehicleFeatureCheckboxInputFormComponent {
  @Input() equipmentCtrl: FormGroup<ControlsOf<any>> = new FormGroup({});
}
