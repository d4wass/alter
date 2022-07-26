import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { UserFacade } from 'src/+state/facade/user.facade';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  userName$!: Observable<string | undefined>;
  userLastName$!: Observable<string | undefined>;
  userEmail$!: Observable<string | undefined>;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userEmail$ = this.userFacade.userEmail$;
    this.userName$ = this.userFacade.userName$;
    this.userLastName$ = this.userFacade.userLastName$.pipe(
      tap((x) => console.log(x)),
      map((x) => x?.substring(0, 1))
    );
  }

  lastnameShortened() {}
}
