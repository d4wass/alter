import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserDataToUpdate, UserDataUpdate } from 'src/+state/models/user.model';

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

  getUserProfile(token: string): Observable<Partial<User>> {
    const userProfile = this.http.get<{
      email: string;
      firstName: string;
      lastName: string;
      id: string;
    }>('http://localhost:3000/profile', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });

    return userProfile;
  }

  //change nameing for this service method
  validateUserDataUpdate(
    updatedData: UserDataUpdate,
    token: string
  ): Observable<{ isPasswordValid: boolean; isMobileValid: boolean }> {
    const validateUserCredentials = this.http.post<{
      isPasswordValid: boolean;
      isMobileValid: boolean;
    }>(
      'http://localhost:3000/validate',
      { updatedData },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    );
    return validateUserCredentials;
  }

  updateUserData(
    updateUser: UserDataToUpdate,
    token: string
  ): Observable<{ user: Partial<User>; token: string }> {
    const updateUserData = this.http.put<{ user: Partial<User>; token: string }>(
      'http://localhost:3000/update',
      { ...updateUser },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    );
    return updateUserData;
  }
}
