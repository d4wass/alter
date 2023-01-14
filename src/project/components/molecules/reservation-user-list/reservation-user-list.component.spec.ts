import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUserListComponent } from './reservation-user-list.component';

describe('ReservationUserListComponent', () => {
  let component: ReservationUserListComponent;
  let fixture: ComponentFixture<ReservationUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationUserListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
