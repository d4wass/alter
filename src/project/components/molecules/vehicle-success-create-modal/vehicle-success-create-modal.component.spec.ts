import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSuccessCreateModalComponent } from './vehicle-success-create-modal.component';

describe('VehicleSuccessCreateModalComponent', () => {
  let component: VehicleSuccessCreateModalComponent;
  let fixture: ComponentFixture<VehicleSuccessCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleSuccessCreateModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleSuccessCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
