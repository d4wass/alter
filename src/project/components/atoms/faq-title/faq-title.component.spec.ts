import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';
import { FaqTitleComponent } from './faq-title.component';

describe('FaqTitleComponent', () => {
  let spectator: Spectator<FaqTitleComponent>;
  let component: FaqTitleComponent;

  const createComponent = createComponentFactory(FaqTitleComponent);
  const selectors = {
    title: () => spectator.query(dataTest('titleNumber'))?.textContent
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show changed value in <h2> tag', () => {
    component.titleNumber = 11;
    spectator.detectComponentChanges();

    expect(selectors.title()).toEqual('012');
  });

  describe('@Inputs', () => {
    it('should set [title] to passed value', () => {
      component.title = 'title';
      spectator.detectComponentChanges();

      expect(component.title).toEqual('title');
    });
    it('should set [titleNumber] to passed value', () => {
      component.titleNumber = 20;
      spectator.detectComponentChanges();

      expect(component.titleNumber).toEqual(20);
    });
  });
});
