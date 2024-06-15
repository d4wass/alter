import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Store, StoreModule } from '@ngrx/store';
import { AppSettingFacade } from './app-settings.facade';

describe('AppSettingFacade', () => {
  let facade: AppSettingFacade;
  let store: Store;
  let spectator: SpectatorService<AppSettingFacade>;

  const createFacade = createServiceFactory({
    service: AppSettingFacade,
    imports: [StoreModule.forRoot({})]
  });

  beforeEach(() => {
    spectator = createFacade();
    facade = spectator.service;
    store = spectator.inject(Store);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  describe('initial state', () => {
    it('should return initial value for isEditProfile$', () => {
      facade.isEditProfile$.subscribe((value) => {
        expect(value).toBe(false);
      });
    });

    it('should return initial value for vehicleBrands$', () => {
      facade.vehicleBrands$.subscribe((value) => {
        expect(value).toEqual([]);
      });
    });
  });

  describe('state changes', () => {
    it('should return updated value for isEditProfile$', () => {
      store.dispatch({ type: '[App] Open Edit Profile User', isProfile: true });
      facade.isEditProfile$.subscribe((value) => {
        expect(value).toBe(true);
      });
    });

    it('should return updated value for vehicleBrands$', () => {
      const brands = ['Brand 1', 'Brand 2'];
      store.dispatch({ type: '[App] Set Initial Data', brands });
      facade.vehicleBrands$.subscribe((value) => {
        expect(value).toEqual(brands);
      });
    });
  });
});
