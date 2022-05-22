import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  loginUser(email: string, password: string) {
    this.http
      .post('http://localhost:3000/auth/login', { email, password })
      .subscribe((response) => {
        console.log('login', response);
      });
  }
}
