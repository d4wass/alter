import { Provider } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { FacadeMock } from 'src/+state/facade.mock';
import { AppSettingFacade } from './app-settings.facade';

export class AppSettingsFacadeMock implements FacadeMock<Partial<AppSettingFacade>> {
  store$ = EMPTY as any;

  isEditProfile$ = new BehaviorSubject<boolean>(false);
  vehicleBrands$ = new BehaviorSubject<string[]>([]);
}

export const AppSettingsFacadeMockProvider: Provider = [
  { provide: AppSettingsFacadeMock, useClass: AppSettingsFacadeMock },
  { provide: AppSettingFacade, useExisting: AppSettingsFacadeMock }
];
