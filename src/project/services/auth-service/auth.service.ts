import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(firstName: string, lastName: string, email: string, password: string) {
    console.log(firstName, lastName, email, password);

    this.http
      .post('http://localhost:3000/user/create', { firstName, lastName, email, password })
      .subscribe((response) => console.log('create user', response));
  }

  loginUser(email: string, password: string): Observable<{ access_token: string }> {
    const auth_token = this.http.post<{ access_token: string }>('http://localhost:3000/login', {
      email,
      password
    });
    console.log(auth_token);
    return auth_token;
  }
}
