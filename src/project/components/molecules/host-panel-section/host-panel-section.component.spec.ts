import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPanelSectionComponent } from './host-panel-section.component';

describe('HostPanelSectionComponent', () => {
  let component: HostPanelSectionComponent;
  let fixture: ComponentFixture<HostPanelSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostPanelSectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPanelSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
