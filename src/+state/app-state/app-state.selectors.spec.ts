import { AppSelectors } from './app-state.selectors';

describe('AppSelectors', () => {
  const createState = (isLoginModalOpen: boolean, isEditProfile: boolean, brands: string[]) => ({
    app: { isLoginModalOpen, isEditProfile, brands }
  });
  it('should select isEditProfile value on selectIsEditProfile', () => {
    const state = createState(false, false, []);
    expect(AppSelectors.selectIsEditProfile(state)).toEqual(state.app.isEditProfile);
  });

  it('should select isLoginModalOpen on selectIsLoginModalOpen', () => {
    const state = createState(false, false, []);
    expect(AppSelectors.selectIsLoginModalOpen(state)).toEqual(state.app.isLoginModalOpen);
  });

  it('should select brands on selectBrands', () => {
    const state = createState(false, false, []);
    expect(AppSelectors.selectBrands(state)).toEqual(state.app.brands);
  });
});
