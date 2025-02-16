import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { FormControl } from '@ngneat/reactive-forms';
import { EquipmentValidationMsg } from 'src/+state/models/user.model';
import { isNonNull } from '../../../../utils/helpers';

@Component({
  selector: 'app-vehicle-equipment-input-form',
  template: `
    <div>
      <form>
        <mat-form-field>
          <mat-label>Enter additional equipment</mat-label>
          <input matInput [formControl]="control" #equipmentInput data-test="input" />
        </mat-form-field>
        <div #tooltip="matTooltip" matTooltip matTooltipPosition="right" data-test="tooltip"></div>
        <button
          class="add-btn"
          mat-flat-button
          color="primary"
          (click)="handleAdd($event)"
          data-test="add-btn"
        >
          Add
        </button>
      </form>
      <mat-list>
        <app-vehicle-equipment-item
          *ngFor="let item of equipment; let i = index"
          [equipment]="item"
          (handleClose)="handleRemove(i)"
        ></app-vehicle-equipment-item>
      </mat-list>
    </div>
  `,
  styleUrls: ['./vehicle-equipment-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class VehicleEquipmentInputFormComponent {
  @ViewChild('equipmentInput') inputElement!: ElementRef;
  @ViewChild('tooltip') tooltip!: MatTooltip;
  @Output() vehicleEquipment = new EventEmitter<string[]>();

  private whiteSpacesRegex = new RegExp(/^(\s+\S+\s*)*(?!\s).*$/);

  control: FormControl<string> = new FormControl('', [
    Validators.minLength(3),
    Validators.pattern(this.whiteSpacesRegex)
  ]);
  equipment: string[] = [];

  handleAdd(e: Event): void {
    e.preventDefault();

    if (isNonNull(this.control.value) && this.control.valid && this.control.value.length !== 0) {
      this.equipment = this.checkListForRepeatsValue(this.control.value);
      this.control.setValue('');
      this.vehicleEquipment.emit(this.equipment);
    } else {
      this.handleEquipmentValidation(this.control.value);
    }

    this.inputElement.nativeElement.focus();
  }

  handleRemove(index: number): void {
    this.equipment.splice(index, 1);
    this.vehicleEquipment.emit(this.equipment);
  }

  private checkListForRepeatsValue(value: string): string[] {
    const trimedValue = value.trim();
    let vehicleEquipment = [...this.equipment, trimedValue];

    if (this.equipment.includes(trimedValue)) {
      vehicleEquipment = this.equipment;
      this.handleEquipmentValidation(trimedValue);
    } else {
      vehicleEquipment = [...this.equipment, trimedValue];
    }

    return vehicleEquipment;
  }

  private handleEquipmentValidation(value: string): void {
    const validationResult = {
      emptyValue: value.length === 0,
      whiteSpacesValue: !this.whiteSpacesRegex.test(value),
      alreadyAddedValue: this.equipment.includes(value.trim()),
      tooShortValue: value.length <= 3 && value.length !== 0
    };

    this.tooltip.message = this.convertEquipmentValidationMsg(validationResult);
    this.tooltip.show();
  }

  private convertEquipmentValidationMsg(validationResult: EquipmentValidationMsg): string {
    const { emptyValue, whiteSpacesValue, alreadyAddedValue, tooShortValue } = validationResult;
    if (emptyValue) {
      return "You don't provide any value. Please enter equipement name";
    }
    if (whiteSpacesValue) {
      return 'You provide incorrect value. Please enter equipement name';
    }
    if (alreadyAddedValue) {
      return 'You already add this value. Make sure your value is unique';
    }
    if (tooShortValue) {
      return 'Provided value is too short.';
    } else {
      return '';
    }
  }
}
