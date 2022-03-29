import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {
  isVisible$ = new BehaviorSubject(false);
  isLogin$ = new BehaviorSubject(true);
  isEmailView$ = new BehaviorSubject(false);

  constructor() {}

  setModalVisibility(isVisible: boolean) {
    this.isVisible$.next(isVisible);
  }

  setModalViewState(isLogin: boolean) {
    this.isLogin$.next(isLogin);
  }

  setEmailViewForModal(isEmail: boolean) {
    this.isEmailView$.next(isEmail);
  }
}

// Todo in service
// default state for modal showing log in or sign up state
//
