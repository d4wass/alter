import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserDataToUpdate, UserDataUpdate } from '../../+state/models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  //TODO: is it necessary or maybe is a bug to use Partial<User> here?
  createUser(user: Partial<User>): Observable<Partial<User>> {
    const { firstName, lastName, email, password } = user;
    const createdUser = this.http.post(`${this.apiUrl}/users`, {
      firstName,
      lastName,
      email,
      password
    });
    return createdUser;
  }

  loginUser(email: string, password: string): Observable<{ access_token: string }> {
    const auth_token = this.http.post<{ access_token: string }>(`${this.apiUrl}/users/login`, {
      email,
      password
    });
    return auth_token;
  }

  getUserProfile(token: string): Observable<User> {
    const userProfile = this.http.get<User>(`${this.apiUrl}/users/login/profile`, {
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
      `${this.apiUrl}/validate`,
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
      `${this.apiUrl}/users`,
      { ...updateUser },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    );
    return updateUserData;
  }
}
