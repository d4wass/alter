import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {
  isVisible$ = new BehaviorSubject(false);
  isLoginView$ = new BehaviorSubject(true);
  isEmailView$ = new BehaviorSubject(false);

  constructor() {}

  setModalVisibility(isVisible: boolean) {
    this.isVisible$.next(isVisible);
  }

  setModalViewState(isLogin: boolean) {
    this.isLoginView$.next(isLogin);
  }

  setEmailViewForModal(isEmail: boolean) {
    this.isEmailView$.next(isEmail);
  }

  setModalToInitialState() {
    this.isVisible$.next(false);
    this.isEmailView$.next(false);
    this.isLoginView$.next(true);
  }
}
