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

  saveName(name: string): void {
    localStorage.setItem('name', name);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): string {
    return localStorage.getItem('user');
  }

  getName(): string {
    return localStorage.getItem('name');
  }

  removeItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
  }


}
