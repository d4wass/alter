import { Provider } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { FacadeMock } from '../../facade.mock';
import { UserFacade } from './user.facade';

export class UserFacadeMock implements FacadeMock<Partial<UserFacade>> {
  store = EMPTY as any;
  vehicleCreated$ = new BehaviorSubject<boolean>(false);

  isVehicleCreated = () => this.vehicleCreated$;
}

export const MOCK_USER_FACADE: Provider = [
  { provide: UserFacadeMock, useClass: UserFacadeMock },
  { provide: UserFacade, useExisting: UserFacadeMock }
];
