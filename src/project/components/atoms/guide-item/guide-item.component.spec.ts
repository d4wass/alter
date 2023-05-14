import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';
import { GuideItemComponent } from './guide-item.component';

describe('GuideItemComponent', () => {
  let spectator: Spectator<GuideItemComponent>;
  let component: GuideItemComponent;

  const createComponent = createComponentFactory(GuideItemComponent);
  const selectors = {
    title: () => spectator.query(dataTest('title'))?.innerHTML,
    content: () => spectator.query(dataTest('content'))?.innerHTML,
    image: () => spectator.query(dataTest('image'))
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });
  //TODO: check if <img> is displayed when @graphic when was setted and conversly

  describe('@Inputs', () => {
    it('should set [graphic] to undefined when input not received any value', () => {
      expect(component.graphic).toBeUndefined();
    });

    describe('set input by value', () => {
      beforeEach(() => {
        component.title = 'Title';
        component.content = 'content';
        component.graphic = 'graphic';

        spectator.detectComponentChanges();
      });

      it('should [title] setted with given value', () => {
        const result = 'Title';
        expect(component.title).toEqual(result);
        expect(selectors.title()).toEqual(result);
      });
      it('should [content] setted with given value', () => {
        const result = 'content';
        expect(component.content).toEqual('content');
        expect(selectors.content()).toEqual(result);
      });
      it('should [graphic] setted with given value', () => {
        expect(component.graphic).toEqual('graphic');
      });
    });
  });
});
