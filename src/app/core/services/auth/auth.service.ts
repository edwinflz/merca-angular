import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../tokens/token.service';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';
import { User } from '@core/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.url_api}/api/users`;
  user: User;

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }


  loginRestApi(email: string, password: string) {
    return this.http.post(this.url, { email, password })
      .pipe(
        tap((data: { error: string, token: string, status: number, user: User }) => {
          if (data.token) {
            const user = data.user;
            const tokens = data.token;
            this.token.saveUser(user.sub);
            this.token.saveName(user.name);
            this.token.saveToken(tokens);
          }
        })
      );
  }

  registerRestApi(name: string, email: string, password: string) {
    return this.http.post(`${this.url}/register`, {
      name,
      email,
      password
    });
  }


  logout(): void {
    this.token.removeItems();
  }
}

