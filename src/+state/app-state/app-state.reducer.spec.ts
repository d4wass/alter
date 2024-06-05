import { AppReducer, initialState } from './app-state.reducer';
import { AppActions } from './app-state.actions';

describe('AppReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = AppReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should open the login modal', () => {
    const action = AppActions.openModal({ isLoginModalOpen: true });
    const state = AppReducer(initialState, action);

    expect(state.isLoginModalOpen).toBe(true);
  });

  it('should close the login modal', () => {
    const action = AppActions.closeModal({ isLoginModalOpen: false });
    const state = AppReducer(initialState, action);

    expect(state.isLoginModalOpen).toBe(false);
  });

  it('should close the login modal on event', () => {
    const action = AppActions.closeLoginModalOnEvent();
    const state = AppReducer(initialState, action);

    expect(state.isLoginModalOpen).toBe(false);
  });

  it('should open the edit profile user', () => {
    const action = AppActions.openEditProfileUser({ isProfile: true });
    const state = AppReducer(initialState, action);

    expect(state.isEditProfile).toBe(true);
  });

  it('should close the edit profile user', () => {
    const action = AppActions.closeEditProfileUser({ isProfile: false });
    const state = AppReducer(initialState, action);

    expect(state.isEditProfile).toBe(false);
  });

  it('should set the initial data', () => {
    const brands = ['Brand 1', 'Brand 2'];
    const action = AppActions.setInitialData({ brands });
    const state = AppReducer(initialState, action);

    expect(state.brands).toEqual(brands);
  });
});
