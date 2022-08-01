import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/+state/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(user: Partial<User>): Observable<Partial<User>> {
    const { firstName, lastName, email, password } = user;
    const createdUser = this.http.post('http://localhost:3000/auth/register', {
      firstName,
      lastName,
      email,
      password
    });
    return createdUser;
  }

  loginUser(email: string, password: string): Observable<{ access_token: string }> {
    const auth_token = this.http.post<{ access_token: string }>(
      'http://localhost:3000/auth/login',
      {
        email,
        password
      }
    );
    return auth_token;
  }

  getUserProfile(token: string) {
    const userProfile = this.http
      .get<{ email: string; firstName: string; lastName: string; id: string }>(
        'http://localhost:3000/profile',
        {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        }
      )
      .pipe(tap((x) => console.log('getUserProfile', x)));
    return userProfile;
  }
}
