import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, mapTo, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {
  isVisible$ = new BehaviorSubject(true);
  clickEvent = fromEvent(document, 'click');

  constructor() {}

  setModalVisibility(isVisible: boolean) {
    this.isVisible$.next(isVisible);
  }
}
