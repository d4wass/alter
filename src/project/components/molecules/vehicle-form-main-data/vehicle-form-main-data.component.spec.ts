import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormMainDataComponent } from './vehicle-form-main-data.component';

describe('VehicleFormMainDataComponent', () => {
  let component: VehicleFormMainDataComponent;
  let fixture: ComponentFixture<VehicleFormMainDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFormMainDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormMainDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
