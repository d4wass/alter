import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { GuideItemComponent } from '../guide-item/guide-item.component';

import { GuideSectionComponent } from './guide-section.component';

describe('GuideSectionComponent', () => {
  let spectator: Spectator<GuideSectionComponent>;
  let component: GuideSectionComponent;

  const createComponent = createComponentFactory({
    component: GuideSectionComponent,
    declarations: [MockComponent(GuideItemComponent)]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
