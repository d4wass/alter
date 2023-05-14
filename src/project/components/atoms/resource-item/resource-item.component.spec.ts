import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';
import { ObjectType } from 'typescript';
import { CtaBtn, ResourceItemComponent } from './resource-item.component';

describe('ResourceItemComponent', () => {
  let component: ResourceItemComponent;
  let spectator: Spectator<ResourceItemComponent>;

  const createComponent = createComponentFactory({
    component: ResourceItemComponent
  });

  const selectors = {
    subtitle: () => spectator.query(dataTest('subtitle'))
  };

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

  describe('@Inputs', () => {
    it('should set value of (content)', () => {
      component.content = 'value';
      expect(component.content).toEqual('value');
    });
    it('should set value of (title)', () => {
      component.title = 'value';
      expect(component.title).toEqual('value');
    });
    it('should set value of (subtitle)', () => {
      component.subtitle = 'value';
      expect(component.subtitle).toEqual('value');
    });
    it('should set value of (icon)', () => {
      component.icon = 'value';
      expect(component.icon).toEqual('value');
    });
    it('should set value of (ctaBtn)', () => {
      component.cta = { content: 'value', route: 'route' };
      expect(component.cta).toEqual({ content: 'value', route: 'route' });
    });
  });
  describe('Template', () => {
    it('should display subtitle if have value', () => {
      component.subtitle = 'subtitle';
      spectator.detectChanges();

      expect(selectors.subtitle()?.innerHTML).toEqual('subtitle');
    });
    it('should not display subtitle if have not value', () => {
      expect(selectors.subtitle()?.innerHTML).toBeUndefined();
    });
  });
});
