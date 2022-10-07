import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditFormComponent } from './account-edit-form.component';

describe('AccountEditFormComponent', () => {
  let component: AccountEditFormComponent;
  let fixture: ComponentFixture<AccountEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountEditFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
