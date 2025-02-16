import { Provider } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { FacadeMock } from '../facade.mock';
import { AppSettingFacade } from '../../+state/facade/app-state/app-settings.facade';

export class AppSettingsFacadeMock implements FacadeMock<Partial<AppSettingFacade>> {
  store$ = EMPTY as any;

  isEditProfile$ = new BehaviorSubject<boolean>(false);
  vehicleBrands$ = new BehaviorSubject<string[]>([]);
}

export const AppSettingsFacadeMockProvider: Provider = [
  { provide: AppSettingsFacadeMock, useClass: AppSettingsFacadeMock },
  { provide: AppSettingFacade, useExisting: AppSettingsFacadeMock }
];
