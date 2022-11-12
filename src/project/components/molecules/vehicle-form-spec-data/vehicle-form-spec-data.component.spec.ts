import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormSpecDataComponent } from './vehicle-form-spec-data.component';

describe('VehicleFormSpecDataComponent', () => {
  let component: VehicleFormSpecDataComponent;
  let fixture: ComponentFixture<VehicleFormSpecDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFormSpecDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleFormSpecDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
