import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: string): void {
    localStorage.setItem('user', user);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): string {
    return localStorage.getItem('user');
  }
}
