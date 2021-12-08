import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNavigationTemplateComponent } from './home-navigation-template.component';

describe('HomeNavigationTemplateComponent', () => {
  let component: HomeNavigationTemplateComponent;
  let fixture: ComponentFixture<HomeNavigationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeNavigationTemplateComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNavigationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
