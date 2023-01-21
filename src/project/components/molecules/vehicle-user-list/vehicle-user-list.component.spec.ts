import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUserListComponent } from './vehicle-user-list.component';

describe('VehicleUserListComponent', () => {
  let component: VehicleUserListComponent;
  let fixture: ComponentFixture<VehicleUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleUserListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
