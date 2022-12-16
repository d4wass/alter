import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFeatureCheckboxInputFormComponent } from './vehicle-feature-checkbox-input-form.component';

describe('VehicleFeatureCheckboxInputFormComponent', () => {
  let component: VehicleFeatureCheckboxInputFormComponent;
  let fixture: ComponentFixture<VehicleFeatureCheckboxInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFeatureCheckboxInputFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFeatureCheckboxInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
