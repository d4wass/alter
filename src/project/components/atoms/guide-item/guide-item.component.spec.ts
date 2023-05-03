import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';
import { GuideItemComponent } from './guide-item.component';

describe('GuideItemComponent', () => {
  let spectator: Spectator<GuideItemComponent>;
  let component: GuideItemComponent;

  const createComponent = createComponentFactory(GuideItemComponent);
  const selectors = {
    title: () => spectator.query(dataTest('title')),
    content: () => spectator.query(dataTest('content')),
    image: () => spectator.query(dataTest('image'))
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });
  //TODO: check if elements of component recived proper value from inputs
  //TODO: check if <img> is displayed when @graphic when was setted and conversly

  describe('@Inputs', () => {
    describe('set input by value', () => {
      beforeEach(() => {
        component.title = 'Title';
        component.content = 'content';
        component.graphic = 'graphic';

        spectator.detectComponentChanges();
      });

      it('should [title] setted with given value', () => {
        expect(component.title).toEqual('Title');
      });
      it('should [content] setted with given value', () => {
        expect(component.content).toEqual('content');
      });
      it('should [graphic] setted with given value', () => {
        expect(component.graphic).toEqual('graphic');
      });
    });

    it('should set [graphic] to indefined when input not received any value', () => {
      expect(component.graphic).toBeUndefined();
    });
  });

  describe('Template', () => {});
});
