import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationVehicleViewComponent } from './reservation-vehicle-view.component';

describe('ReservationVehicleModalComponent', () => {
  let component: ReservationVehicleViewComponent;
  let fixture: ComponentFixture<ReservationVehicleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationVehicleViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationVehicleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
