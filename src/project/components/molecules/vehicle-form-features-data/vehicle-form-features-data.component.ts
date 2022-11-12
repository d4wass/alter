import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form-features-data',
  template: `
    <form>
      <h2>Features</h2>
      <h4>Engine</h4>
      <mat-form-field appearance="fill" floatLabel="always">
        <mat-label>capacity</mat-label>
        <input matInput type="number" class="example-right-align" placeholder="0" />
      </mat-form-field>
      <mat-form-field appearance="fill" floatLabel="always">
        <mat-label>power</mat-label>
        <input matInput type="number" class="example-right-align" placeholder="0" />
      </mat-form-field>
      <h4>Gearbox</h4>
      <mat-radio-group aria-label="Select an option">
        <mat-radio-button value="manual">Manual</mat-radio-button>
        <mat-radio-button value="automatic">Automatic</mat-radio-button>
      </mat-radio-group>
      <h4>Drive type</h4>
      <mat-radio-group aria-label="Select an option">
        <mat-radio-button value="rear">rear</mat-radio-button>
        <mat-radio-button value="front">front</mat-radio-button>
        <mat-radio-button value="all">all</mat-radio-button>
      </mat-radio-group>
      <h4>Additional Equipment</h4>
      <section class="example-section">
        <mat-checkbox class="example-margin">Apple Car Play</mat-checkbox>
        <mat-checkbox class="example-margin">Android Auto</mat-checkbox>
        <mat-checkbox class="example-margin">Bluetooth</mat-checkbox>
        <mat-checkbox class="example-margin">USB</mat-checkbox>
        <mat-checkbox class="example-margin">headup display</mat-checkbox>
        <mat-checkbox class="example-margin">navigation</mat-checkbox>
        <mat-checkbox class="example-margin">air conditioning</mat-checkbox>
        <mat-checkbox class="example-margin">keyless access</mat-checkbox>
        <mat-checkbox class="example-margin">isofix</mat-checkbox>
        <section>
          <h5>Cruise Control</h5>
          <mat-checkbox class="example-margin">standard</mat-checkbox>
          <mat-checkbox class="example-margin">active</mat-checkbox>
          <mat-checkbox class="example-margin">adaptive</mat-checkbox>
          <mat-checkbox class="example-margin">autonomic</mat-checkbox>
        </section>
        <section>
          <h5>Lights</h5>
          <mat-checkbox class="example-margin">led</mat-checkbox>
          <mat-checkbox class="example-margin">xenon</mat-checkbox>
          <mat-checkbox class="example-margin">bi-xenon</mat-checkbox>
          <mat-checkbox class="example-margin">laser</mat-checkbox>
        </section>
        <section>
          <h5>Park assist</h5>
          <mat-checkbox class="example-margin">camera</mat-checkbox>
          <mat-checkbox class="example-margin">camera 360</mat-checkbox>
          <mat-checkbox class="example-margin">automatic</mat-checkbox>
        </section>
      </section>
    </form>
  `,
  styleUrls: ['./vehicle-form-features-data.component.scss']
})
export class VehicleFormFeaturesDataComponent {
  constructor() {}
}
