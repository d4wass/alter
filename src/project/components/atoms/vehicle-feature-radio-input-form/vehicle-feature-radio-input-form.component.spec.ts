import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFeatureRadioInputFormComponent } from './vehicle-feature-radio-input-form.component';

describe('VehicleFeatureRadioInputFormComponent', () => {
  let component: VehicleFeatureRadioInputFormComponent;
  let fixture: ComponentFixture<VehicleFeatureRadioInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFeatureRadioInputFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFeatureRadioInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
