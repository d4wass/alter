import { BehaviorSubject } from 'rxjs';
import { FacadeMock } from 'src/+state/facade.mock';
import { AppSettingFacade } from './app-settings.facade';

export class AppSettingsFacadeMock implements FacadeMock<Partial<AppSettingFacade>> {
  isEditProfile$ = new BehaviorSubject(false);
  vehicleBrands$ = new BehaviorSubject([]);
}
