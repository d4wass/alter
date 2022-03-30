import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeaderInputComponent } from './search-header-input.component';

describe('SearchHeaderInputComponent', () => {
  let component: SearchHeaderInputComponent;
  let fixture: ComponentFixture<SearchHeaderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHeaderInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeaderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
