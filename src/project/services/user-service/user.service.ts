import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/+state/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserProfile(
    token: string,
    user: Partial<User>
  ): Observable<{ updatedUser: Partial<User> }> {
    const updateUser = this.http.put<{ updatedUser: Partial<User> }>(
      'http://localhost:3000/update',
      { user, token },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
    );

    return updateUser;
  }
}
