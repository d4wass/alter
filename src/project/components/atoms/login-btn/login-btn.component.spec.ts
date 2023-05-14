import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';
import { ProfileViewComponent } from '../../../views/profile-view/profile-view.component';
import { dataTest } from '../../../../utils/data-test';
import { LoginBtnComponent } from './login-btn.component';

describe('LoginBtnComponent', () => {
  let component: LoginBtnComponent;
  let spectator: SpectatorRouting<LoginBtnComponent>;

  const createComponent = createRoutingFactory({
    component: LoginBtnComponent,
    declarations: [ProfileViewComponent],
    stubsEnabled: false,
    routes: [
      {
        path: '',
        component: LoginBtnComponent
      },
      {
        path: 'profile',
        component: ProfileViewComponent
      }
    ]
  });

  const selectors = {
    loginBtn: () => spectator.query(dataTest('login-btn')),
    loginBtnText: () => spectator.query(dataTest('login-btn-text'))
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    { isAuth: true, text: 'userName' },
    { isAuth: false, text: 'Log in' }
  ])('should match to snapshot and button should have proper text when %s', ({ isAuth, text }) => {
    component.isAuthorized = isAuth;
    component.userName = text;
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    expect(selectors.loginBtnText()?.innerHTML).toEqual(text);
  });

  describe('(isClicked)', () => {
    it('should emit (isClicked) event on button click when isAuthorized value is false', () => {
      let result;

      spectator.output('isClicked').subscribe((v) => (result = v));
      spectator.dispatchMouseEvent('.login-btn', 'click');

      expect(result).toEqual(true);
    });

    it('should not emit (isClicked) event on button click when isAuthorized value is true', () => {
      let result;
      component.isAuthorized = true;

      spectator.detectChanges();
      spectator.output('isClicked').subscribe((v) => (result = v));
      spectator.dispatchMouseEvent('.login-btn', 'click');

      expect(result).toBeUndefined();
    });
  });
  describe('Router', () => {
    it('should change router when user is authorized on button click', () => {
      component.isAuthorized = true;
      spectator.detectChanges();

      expect(spectator.router.url).toEqual('/');
      spectator.dispatchMouseEvent('.login-btn', 'click');

      expect(spectator.router.url).toEqual('/profile');
    });
  });
});
