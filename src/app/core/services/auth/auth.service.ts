import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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
    private token: TokenService,
    private af: AngularFireAuth,
    private fd: AngularFireDatabase
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

  updateUidUser(id: number, uid: string) {
    return this.http.post(`${this.url}/uid`, {
      id,
      uid
    });
  }

  deleteUser(id: number) {
    return this.http.post(`${this.url}/delete`, {
      id
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  createUserFirebase(user: any) {
    return this.fd.object(`/users/${user.uid}`).set(user);
  }

  getStatus() {
    return this.af.authState;
  }

  getUserById(uid: string) {
    return this.fd.object(`/users/${uid}`);
  }

  logout(): Promise<void> {
    this.token.removeItems();
    return this.af.signOut()
      .then((success) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

