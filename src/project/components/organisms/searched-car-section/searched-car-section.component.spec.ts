import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedCarSectionComponent } from './searched-car-section.component';

describe('SearchedCarSectionComponent', () => {
  let component: SearchedCarSectionComponent;
  let fixture: ComponentFixture<SearchedCarSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchedCarSectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedCarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
