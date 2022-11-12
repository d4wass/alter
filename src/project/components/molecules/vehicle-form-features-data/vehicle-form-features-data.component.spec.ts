import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormFeaturesDataComponent } from './vehicle-form-features-data.component';

describe('VehicleFormFeaturesDataComponent', () => {
  let component: VehicleFormFeaturesDataComponent;
  let fixture: ComponentFixture<VehicleFormFeaturesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFormFeaturesDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormFeaturesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
