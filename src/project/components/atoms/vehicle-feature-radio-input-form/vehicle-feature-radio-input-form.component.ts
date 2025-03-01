import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule
  ],
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
