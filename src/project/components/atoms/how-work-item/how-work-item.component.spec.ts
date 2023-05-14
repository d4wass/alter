import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';
import { HowWorkItemComponent } from './how-work-item.component';

describe('HowWorkItemComponent', () => {
  let component: HowWorkItemComponent;
  let spectator: Spectator<HowWorkItemComponent>;

  const createComponent = createComponentFactory({
    component: HowWorkItemComponent
  });

  const selectors = {
    indicator: () => spectator.query(dataTest('indicator'))
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to component', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Inputs', () => {
    beforeEach(() => {
      component.itemContent = 'itemContent';
      component.itemNumber = '1';
      component.itemTitle = 'itemTitle';
    });

    it('should set [itemContent]', () => {
      const result = 'itemContent';
      expect(component.itemContent).toEqual(result);
    });
    it('should set [itemNumber]', () => {
      const result = '1';
      expect(component.itemNumber).toEqual(result);
    });
    it('should set [itemTitle]', () => {
      const result = 'itemTitle';
      expect(component.itemTitle).toEqual(result);
    });
  });

  describe('Component template', () => {
    beforeEach(() => {
      component.itemContent = 'itemContent';
      component.itemTitle = 'itemTitle';
    });
    it('should not display indicator when [itemNumber] is not defined', () => {
      spectator.detectComponentChanges();
      expect(component.itemNumber).toBeUndefined();
      expect(selectors.indicator()).toBeNull();
    });
    it('should display indicator when [itemNumber] is defined', () => {
      const result = '2';

      component.itemNumber = '2';
      spectator.detectComponentChanges();

      expect(selectors.indicator()?.innerHTML).toEqual(result);
    });
  });
});
