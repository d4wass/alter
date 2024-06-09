import { Observable, BehaviorSubject } from 'rxjs';

export type FacadeMock<T> = {
  [P in keyof T]: T[P] extends Observable<infer U>
    ? BehaviorSubject<U>
    : T[P] extends (args: infer A) => Observable<infer R>
    ? (args: A) => BehaviorSubject<R>
    : T[P];
};
