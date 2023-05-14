import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';
import { FaqViewComponent } from '../../../views/faq-view/faq-view.component';
import { dataTest } from '../../../../utils/data-test';

import { NavigationItemComponent } from './navigation-item.component';

describe('NavigationItemComponent', () => {
  let component: NavigationItemComponent;
  let spectator: SpectatorRouting<NavigationItemComponent>;

  const mock = {
    urlItem: { description: 'Learn more', url: 'faq' }
  };
  const selectors = {
    link: () => spectator.query(dataTest('link'))
  };

  const createComponent = createRoutingFactory({
    component: NavigationItemComponent,
    stubsEnabled: false,
    routes: [
      {
        path: '',
        component: NavigationItemComponent
      },
      { path: mock.urlItem.url, component: FaqViewComponent }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('(item)', () => {
    it('should set (item) to urlItem when gets value', () => {
      component.item = mock.urlItem;
      spectator.detectChanges();

      expect(component.item).toEqual(mock.urlItem);
      expect(selectors.link()?.innerHTML).toEqual(mock.urlItem.description);
    });
    it('should set (item) to undefined when not get value', () => {
      expect(component.item).toBeUndefined();
    });
  });

  describe('Router', () => {
    it('should change router on click when (item) has value', async () => {
      component.item = mock.urlItem;
      spectator.detectChanges();

      spectator.dispatchMouseEvent('.link', 'click');
      expect(spectator.router.url).toEqual(`/${mock.urlItem.url}`);
    });
    it('should not change router on click when (item) is undefined', () => {
      spectator.dispatchMouseEvent('.link', 'click');
      expect(spectator.router.url).toEqual(`/`);
    });
  });
});
