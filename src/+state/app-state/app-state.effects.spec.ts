import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AppEffects } from './app-state.effects';

describe('AppEffects', () => {
  const createEffects = ({
    actions = new Subject<Action>(),
    modalLoginService = {},
    vehicleService = {}
  }: { actions?: any; modalLoginService?: any; vehicleService?: any } = {}) => {
    return {
      actions,
      modalLoginService,
      vehicleService,
      effects: new AppEffects(actions, modalLoginService, vehicleService)
    };
  };
});
