import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';

@Injectable({ providedIn: 'root' })
export class UserProfileGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate(): Observable<boolean> {
    return this.userFacade.isAuthorized$.pipe(map((isAuthorized) => isAuthorized));
  }
}
