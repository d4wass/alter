import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AppActions } from './app-state.actions';
import { AppEffects } from './app-state.effects';

describe('AppEffects', () => {
  const isLogin$ = new BehaviorSubject<boolean>(false);
  const isEmail$ = new BehaviorSubject<boolean>(false);
  const isVisible$ = new BehaviorSubject<boolean>(false);

  const createEffects = ({
    actions = new Subject<Action>(),
    modalLoginService = {
      setModalVisibility: jest.fn().mockImplementation((value: boolean) => isVisible$.next(value)),
      setModalToInitialState: jest.fn().mockImplementation(() => {
        isVisible$.next(false);
        isEmail$.next(false);
        isLogin$.next(true);
      }),
      setModalViewState: jest.fn().mockImplementation((value: boolean) => isLogin$.next(value)),
      setEmailViewForModal: jest.fn().mockImplementation((value: boolean) => isEmail$.next(value))
    },
    vehicleService = {
      getVehicleBrands: jest.fn().mockImplementation(() => of([]))
    }
  }: { actions?: any; modalLoginService?: any; vehicleService?: any } = {}) => {
    return {
      actions,
      modalLoginService,
      vehicleService,
      effects: new AppEffects(actions, modalLoginService, vehicleService)
    };
  };

  it('should be created', () => {
    const { effects } = createEffects();
    expect(effects).toBeTruthy();
  });

  describe('handleModalVisibility', () => {
    it('should call setModalVisibility on openModal action and set correct value to isVisble state on ', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setModalVisibilitySpy = jest.spyOn(modalLoginService, 'setModalVisibility');
      const result = jest.fn();

      effects.handleModalVisibility().subscribe(result);

      actions.next(AppActions.openModal({ isLoginModalOpen: true }));

      expect(result).toHaveBeenCalled();
      expect(setModalVisibilitySpy).toHaveBeenCalledWith(true);
      expect(isVisible$.value).toEqual(true);

      actions.next(AppActions.openModal({ isLoginModalOpen: false }));

      expect(result).toHaveBeenCalled();
      expect(setModalVisibilitySpy).toHaveBeenCalledWith(false);
      expect(isVisible$.value).toEqual(false);
    });

    it('should call setModalVisibility on closeModal action', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setModalVisibilitySpy = jest.spyOn(modalLoginService, 'setModalVisibility');
      const result = jest.fn();

      effects.handleModalVisibility().subscribe(result);

      actions.next(AppActions.closeModal({ isLoginModalOpen: false }));
      expect(result).toHaveBeenCalled();
      expect(setModalVisibilitySpy).toHaveBeenCalledWith(false);
    });
  });

  describe('setModalToInitialStateAfterClose', () => {
    it('should call setModalToInitialState on closeLoginModalOnEvent action', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setModalToInitialStateSpy = jest.spyOn(modalLoginService, 'setModalToInitialState');
      const result = jest.fn();

      effects.setModalToInitialStateAfterClose().subscribe(result);

      actions.next(AppActions.closeLoginModalOnEvent());
      expect(result).toHaveBeenCalled();
      expect(setModalToInitialStateSpy).toHaveBeenCalled();
      expect(isVisible$.value).toEqual(false);
      expect(isEmail$.value).toEqual(false);
      expect(isLogin$.value).toEqual(true);
    });
  });

  describe('setModalToSignUpView', () => {
    it('should call setModalViewState and setEmailViewForModal on setLoginModalToSignUpView action', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setModalViewStateSpy = jest.spyOn(modalLoginService, 'setModalViewState');
      const setEmailViewForModalSpy = jest.spyOn(modalLoginService, 'setEmailViewForModal');
      const result = jest.fn();

      effects.setModalToSignUpView().subscribe(result);

      actions.next(AppActions.setLoginModalToSignUpView({ isSignUp: true }));
      expect(result).toHaveBeenCalled();
      expect(setModalViewStateSpy).toHaveBeenCalledWith(true);
      expect(setEmailViewForModalSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('setModalToLoginView', () => {
    it('should call setModalViewState on setLoginModalToLoginView action', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setModalViewStateSpy = jest.spyOn(modalLoginService, 'setModalViewState');
      const result = jest.fn();

      effects.setModalToLoginView().subscribe(result);

      actions.next(AppActions.setLoginModalToLoginView({ isLogin: true }));
      expect(result).toHaveBeenCalled();
      expect(setModalViewStateSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('setModalToSignUpEmailView', () => {
    it('should call setEmailViewForModal on setLoginModalToSingUpEmailView action', () => {
      const { effects, actions, modalLoginService } = createEffects({});
      const setEmailViewForModalSpy = jest.spyOn(modalLoginService, 'setEmailViewForModal');
      const result = jest.fn();

      effects.setModalToSignUpEmailView().subscribe(result);

      actions.next(AppActions.setLoginModalToSingUpEmailView({ isEmail: true }));
      expect(result).toHaveBeenCalled();
      expect(setEmailViewForModalSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('setInitialData', () => {
    it('should call getVehicleBrands on loadInitialData action', () => {
      const { effects, actions } = createEffects({});

      actions.next(AppActions.loadInitialData());

      effects.setInitialData().subscribe((action) => {
        expect(action).toEqual(AppActions.setInitialData({ brands: [] }));
      });
    });

    it('should call getVehicleBrands on loadInitialData action and return error on request reject', () => {
      const error = new Error('error');
      const { effects } = createEffects({
        vehicleService: {
          getVehicleBrands: jest.fn().mockRejectedValue(() => of({ error }))
        }
      });

      effects.setInitialData().subscribe((action) => {
        expect(action).toEqual(AppActions.setInitialDataError({ error }));
      });
    });
  });
});
