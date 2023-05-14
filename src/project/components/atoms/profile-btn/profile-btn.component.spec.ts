import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ProfileBtnComponent } from './profile-btn.component';

describe('ProfileBtnComponent', () => {
  let component: ProfileBtnComponent;
  let spectator: Spectator<ProfileBtnComponent>;

  const createComponent = createComponentFactory({
    component: ProfileBtnComponent
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

  describe('@Outputs', () => {
    it('should emit (handleClickEvent) on btn click event', () => {
      const spy = jest.spyOn(component, 'handleClick');
      spectator.dispatchMouseEvent('.btn-default', 'click');

      expect(spy).toHaveBeenCalled();
    });
    it('should emit (handleClickEvent) on handleClick() method call', () => {
      const spy = jest.spyOn(component.handleClickEvent, 'emit');
      component.handleClick();

      expect(spy).toHaveBeenCalled();
    });
  });
});
