import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle-feature-radio-input-form',
  template: `
    <form>
      <h4>{{ title }}</h4>
      <mat-radio-group *ngFor="let type of types" [formControl]="formCtrl" [(ngModel)]="name">
        <mat-radio-button [value]="type">{{ type }}</mat-radio-button>
      </mat-radio-group>
    </form>
  `,
  styleUrls: ['./vehicle-feature-radio-input-form.component.scss']
})
export class VehicleFeatureRadioInputFormComponent {
  @Input() title!: string;
  @Input() formCtrl!: FormControl<string>;
  @Input() types!: string[];
  name!: string;

  constructor() {}
}
