import { Router } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UserActions } from '../../../../../+state/user/user.actions';
import { UserFacade } from '../../../../../+state/facade/user/user.facade';
import { dataTest } from '../../../../../utils/data-test';
import { VehicleFormComponent } from './vehicle-form.component';
import { mockVehicleFormData } from '../../../../../utils/mocks/mockVehicleFormData';
import { VehicleSuccessCreateModalComponent } from '../../../../components/molecules/vehicle-success-create-modal/vehicle-success-create-modal.component';
import { MOCK_USER_FACADE, UserFacadeMock } from '../../../../../utils/mocks/user.facade.mock';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let vehicleSuccessCreateComponent: VehicleSuccessCreateModalComponent | null;
  let spectator: Spectator<VehicleFormComponent>;
  let store: Store;
  let userFacade: UserFacadeMock;
  let router: Router;

  const createComponent = createComponentFactory({
    component: VehicleFormComponent,
    declarations: [MockComponent(VehicleSuccessCreateModalComponent)],
    providers: [
      MockProvider(Router),
      { provide: Store, useValue: { dispatch: jest.fn() } },
      {
        provide: UserFacade,
        useValue: {
          isVehicleCreated: () => of(false)
        }
      },
      MOCK_USER_FACADE
    ],
    shallow: true
  });

  const selectors = {
    submitBtn: () => spectator.query<HTMLButtonElement>(dataTest('submit-btn'))
  };

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    store = spectator.inject(Store);
    userFacade = spectator.inject(UserFacadeMock);
    router = spectator.inject(Router);
    vehicleSuccessCreateComponent = spectator.query(VehicleSuccessCreateModalComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match to snapshot', () => {
    expect(spectator.fixture).toMatchSnapshot();
  });

  describe('handleSubmitVehicle()', () => {
    it('should dispatch action on fn call', () => {
      const vehicle = mockVehicleFormData();
      component.handleSubmitVehicle();
      expect(store.dispatch).toHaveBeenCalledWith(UserActions.addUserVehicle({ vehicle }));
    });
    it('should call fn on button click', () => {
      const spy = jest.spyOn(component, 'handleSubmitVehicle');
      spectator.dispatchMouseEvent(selectors.submitBtn()!, 'click');

      expect(spy).toBeCalled();
    });
  });

  describe('resetFormAfterCreation()', () => {
    beforeEach(() => jest.resetAllMocks());

    it('should reset form on (handleClick) emitter', () => {
      const spy = jest.spyOn(component.form, 'reset');
      userFacade.vehicleCreated$.next(true);
      vehicleSuccessCreateComponent?.handleClick.emit();

      expect(spy).toBeCalled();
    });
    it('should not reset form when vehicle was not successfuly created', () => {
      const spy = jest.spyOn(component.form, 'reset');
      vehicleSuccessCreateComponent?.handleClick.emit();

      expect(spy).not.toBeCalled();
    });
    it('should dispatch action after vehicle creation', () => {
      userFacade.vehicleCreated$.next(true);
      vehicleSuccessCreateComponent?.handleClick.emit();

      expect(store.dispatch).toBeCalledWith(UserActions.vehicleResetForm());
    });
    it('should not dispatch action when vehicle was not successfuly created', () => {
      vehicleSuccessCreateComponent?.handleClick.emit();

      expect(store.dispatch).not.toBeCalledWith(UserActions.vehicleResetForm());
    });

    it.each([true, false])(
      'should call router navigate depend on successfully vehicle creation',
      (vehicleCreated: boolean) => {
        const spy = jest.spyOn(router, 'navigate');
        userFacade.vehicleCreated$.next(vehicleCreated);
        vehicleSuccessCreateComponent?.handleClick.emit();

        if (vehicleCreated) {
          expect(spy).toHaveBeenCalledWith(['profile']);
        } else {
          expect(spy).not.toHaveBeenCalled();
        }
      }
    );
  });
});
