import { Provider } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { UserFacade } from './user.facade';

type FacadeMock<T> = {
  [P in keyof T]: T[P] extends Observable<infer U>
    ? BehaviorSubject<U>
    : T[P] extends (args: infer A) => Observable<infer R>
    ? (args: A) => BehaviorSubject<R>
    : T[P];
};

export class UserFacadeMock implements FacadeMock<Partial<UserFacade>> {
  store = EMPTY as any;
  vehicleCreated$ = new BehaviorSubject<boolean>(false);

  isVehicleCreated = () => this.vehicleCreated$;
}

export const MOCK_USER_FACADE: Provider = [
  { provide: UserFacadeMock, useClass: UserFacadeMock },
  { provide: UserFacade, useExisting: UserFacadeMock }
];
