import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/+state/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateUserProfile(
    token: string,
    user: Partial<User>
  ): Observable<{ updatedUser: Partial<User> }> {
    const updateUser = this.http.put<{ updatedUser: Partial<User> }>(
      `${this.apiUrl}/update`,
      { user, token },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }
    );

    return updateUser;
  }
}
