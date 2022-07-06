import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedCarCardComponent } from './searched-car-card.component';

describe('SearchedCarCardComponent', () => {
  let component: SearchedCarCardComponent;
  let fixture: ComponentFixture<SearchedCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchedCarCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
