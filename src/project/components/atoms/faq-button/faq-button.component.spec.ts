import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { dataTest } from '../../../../utils/data-test';

import { FaqButtonComponent } from './faq-button.component';

describe('FaqButtonComponent', () => {
  let component: FaqButtonComponent;
  let spectator: Spectator<FaqButtonComponent>;

  const createComponent = createComponentFactory(FaqButtonComponent);
  const selectors = {
    btn: () => spectator.query(dataTest('btn'))
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

  describe('(isOpenEvent)', () => {
    it('should emit event on click', () => {
      const isOpen = component.isOpen;
      const spy = jest.spyOn(component.isOpenEvent, 'emit');

      spectator.click(selectors.btn()!);

      expect(spy).toHaveBeenCalledWith(!isOpen);
    });

    it.each([true, false])('should emit isOpenEvent with %s value', (value) => {
      component.isOpen = value;
      const spy = jest.spyOn(component.isOpenEvent, 'emit');

      spectator.click(selectors.btn()!);

      expect(spy).toHaveBeenCalledWith(!value);
    });
  });

  describe('handleOpen()', () => {
    it.each([true, false])('should change isOpen value on handleOpen() call', (value) => {
      const spy = jest.spyOn(component, 'handleOpen');
      component.isOpen = value;

      spectator.click(selectors.btn()!);
      spectator.detectChanges();

      expect(spy).toBeCalled();
      expect(component.isOpen).toEqual(!value);
    });
  });
});
