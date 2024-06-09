import { AppSelectors } from './app-state.selectors';

describe('AppSelectors', () => {
  const createState = (isLoginModalOpen: boolean, isEditProfile: boolean, brands: string[]) => ({
    app: { isLoginModalOpen, isEditProfile, brands }
  });
  const state = createState(false, false, []);

  it('should select isEditProfile value on selectIsEditProfile', () => {
    expect(AppSelectors.selectIsEditProfile(state)).toEqual(state.app.isEditProfile);
  });

  it('should select isLoginModalOpen on selectIsLoginModalOpen', () => {
    expect(AppSelectors.selectIsLoginModalOpen(state)).toEqual(state.app.isLoginModalOpen);
  });

  it('should select brands on selectBrands', () => {
    expect(AppSelectors.selectBrands(state)).toEqual(state.app.brands);
  });
});
